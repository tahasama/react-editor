import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CssEditor from "../components/cssEditor";
import HtmlEditor from "../components/htmlEditor";
import JsEditor from "../components/jsEditor";

import "./fullEditor.css";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  cleanState,
  cloneProject,
  deleteProject,
  fetchProject,
  getProjectData,
  projectInitialState,
  saveProject,
  StarProject,
  updateCode,
  updateSaved,
} from "../state/";

import TopBar from "../components/topBar";
import { getUserData } from "../state/reducers/userSlice";
import { getAuthData } from "../state/reducers/authSlice";
import Resizable from "../components/resizable";
import ThreeEditors from "../components/threeEditors";

function FullEditor() {
  const [resize, setResize] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(getAuthData);
  const {
    title,
    description,
    code: { html, css, js },
    updatedAt,
    saved,
    star,
  } = useAppSelector(getProjectData);
  const { uid } = useAppSelector(getUserData);

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
    dispatch(fetchProject(id));

    window.onbeforeunload = function (e: any) {
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
        code: { html: html, css: css, js: js },
      })
    );

    dispatch(updateCode({ code: { html: html, css: css, js: js } }));
    dispatch(updateSaved(true));
  };

  const handleClone = () => {
    dispatch(
      cloneProject({
        uid: uid,
        user: email,
        title: title,
        description: description,
        code: { html: html, css: css, js: js },
      })
    );
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

  const srcDoc = `<html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script> 
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
              <div className="frameWrapper">
                <iframe srcDoc={srcDoc} title="codeFrame"></iframe>
              </div>
            </Resizable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullEditor;
