import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CssEditor from "../components/cssEditor";
import HtmlEditor from "../components/htmlEditor";
import JsEditor from "../components/jsEditor";
import { v4 as uuidv4 } from "uuid";

import "./fullEditor.css";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  AddCells,
  cleanState,
  cloneProject,
  DeleteCells,
  deleteProject,
  fetchProject,
  getProjectData,
  projectInitialState,
  saveProject,
  StarProject,
  updateCellCode,
  // updateCells,
  updateCode,
  updateSaved,
} from "../state/";

import TopBar from "../components/topBar";
import { getUserData } from "../state/reducers/userSlice";
import { getAuthData } from "../state/reducers/authSlice";
import Resizable from "../components/resizable";
import ThreeEditors from "../components/threeEditors";
import ReactCells from "../components/reactCells";

function FullEditor() {
  const [resize, setResize] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(getAuthData);
  const { title, description, code, updatedAt, saved, type, reactCode, cells } =
    useAppSelector(getProjectData);
  const { uid } = useAppSelector(getAuthData);
  const iframe = useRef<any>();
  const location = useLocation();

  useEffect(() => {
    if (type !== "reactProject" && !location.pathname.includes("react"))
      iframe.current.srcdoc = srcDoc;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 820) {
        setResize(false);
      } else {
        setResize(true);
      }
    }

    window.addEventListener("resize", handleResize);
  }, [window.innerWidth]);

  useEffect(() => {
    if (id !== "code-and-run") {
      dispatch(fetchProject(id));
    }

    window.onbeforeunload = function (e: any) {
      e.preventDefault();
      var e = e || window.event;
      if (e && !saved) {
        e.returnValue = "Any string";
      }
    };
    return () => {
      window.onbeforeunload = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved]);

  const handleUpdateTitle = (e: any) => {
    e.preventDefault();

    dispatch(
      saveProject({
        _id: id,
        title: title,
        description: description,
        code: { html: code?.html, css: code?.css, js: code?.js },
        cells: cells,
      })
    );

    dispatch(
      updateCode({ code: { html: code?.html, css: code?.css, js: code?.js } })
    );
    dispatch(updateCellCode(cells));
    dispatch(updateSaved(true));
    setSaveMessage("Saved !");
    setTimeout(() => {
      setSaveMessage("");
    }, 1000);
  };

  const handleClone = () => {
    dispatch(
      cloneProject({
        uid: uid,
        user: email,
        title: title,
        description: description,
        code: { html: code?.html, css: code?.css, js: code?.js },
        cells: cells,
        type: type,
      })
    );
    setSaveMessage("Cloned ! ");
    setTimeout(() => {
      setSaveMessage("");
    }, 1000);
  };

  const handleDeleteProject = async () => {
    const result = window.confirm("are you sure you want to delete ");
    if (result) {
      dispatch(deleteProject(id));
      dispatch(cleanState(projectInitialState));
      navigate("/projects");
    } else {
      navigate("");
    }
  };
  // const handleAddCells = () => {
  //   dispatch(AddCells({ cellId: uuidv4(), cellCode: "" }));
  // };

  const srcDoc = `<html>
                    <body>${code?.html}</body>
                    <style>${code?.css}</style>
                    <script>${code?.js}</script> 
                  </html>`;

  return (
    <div>
      <TopBar />
      <SideBar
        remove={handleDeleteProject}
        save={handleUpdateTitle}
        clone={handleClone}
        // star={handleStar}
      />
      <div className="editorWrapper">
        <div className="titleContainer">
          {id && (
            <>
              {saveMessage && <p className="saveMessage">{saveMessage}</p>}
              {email ? (
                <h2 className="projectTitle">Project: {title} </h2>
              ) : (
                <p className="projectWarning">
                  This work can't be saved, Log in and create/save or clone
                  projects.
                </p>
              )}
              {email && (
                <p className="date ">
                  Updated on &#160;
                  {new Date(updatedAt).toLocaleDateString(navigator.language, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  &#160; at &#160;
                  {new Date(updatedAt).toLocaleTimeString(navigator.language, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              )}
            </>
          )}
        </div>
        <div className="fullEdit">
          {type !== "reactProject" && !location.pathname.includes("react") ? (
            <>
              <div>
                {resize ? (
                  <Resizable direction={"vertical-down"}>
                    <ThreeEditors />
                  </Resizable>
                ) : (
                  <ThreeEditors />
                )}
              </div>
              <div className="frame">
                <Resizable direction={"vertical-up"}>
                  <div className="preview-wrapper">
                    <iframe
                      title="preview"
                      ref={iframe}
                      sandbox="allow-scripts"
                      srcDoc={srcDoc}
                    />
                  </div>
                </Resizable>
              </div>
            </>
          ) : (
            <ReactCells />
          )}
        </div>
      </div>
    </div>
  );
}

export default FullEditor;
