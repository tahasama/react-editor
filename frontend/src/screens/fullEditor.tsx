import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CssEditor from "../components/cssEditor";
import HtmlEditor from "../components/htmlEditor";
import JsEditor from "../components/jsEditor";
import { AiOutlineSave } from "react-icons/ai";

import "./fullEditor.css";
import SideBar from "../components/sideBar";

function FullEditor() {
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGetProject = async () => {
    const { data } = await axios.get("http://localhost:5000/api/project/" + id);
    setHtml(data.code.html);
    setCss(data.code.css);
    setJs(data.code.js);
  };

  useEffect(() => {
    handleGetProject();
  }, []);

  const handleSaveProject = async () => {
    const saveData = {
      code: {
        html: html,
        css: css,
        js: js,
      },
    };
    const { data } = await axios.put(
      "http://localhost:5000/api/project/" + id,
      saveData
    );
    console.log("we sent this data : ", data);
  };
  const handleDeleteProjectClick = async () => {
    const result = window.confirm("are you sure you want to delete ");
    if (result) {
      const { data } = await axios.delete(
        "http://localhost:5000/api/project/" + id
      );
      navigate("/");
    }
  };

  const srcDoc = `<html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script> 
                  </html>`;

  return (
    <div className="editor-wrapper">
      <SideBar
        handleSaveProject={handleSaveProject}
        handleDeleteProjectClick={handleDeleteProjectClick}
        id={id}
      />
      {/* <button className="save side a" onClick={handleSaveProject}>
        <AiOutlineSave className="saveIcon" />
      </button> */}
      <div className="editors">
        <div className="editor">
          <HtmlEditor html={html} setHtml={setHtml} id={id} />
        </div>
        <div className="editor">
          <CssEditor css={css} setCss={setCss} />
        </div>
        <div className="editor">
          <JsEditor js={js} setJs={setJs} />
        </div>
      </div>

      <div className="frame">
        <iframe srcDoc={srcDoc} width="100%"></iframe>
      </div>
    </div>
  );
}

export default FullEditor;
