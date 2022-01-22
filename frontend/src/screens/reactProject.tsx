import React from "react";
import "./reactProject.css";
import { useState, useEffect } from "react";
import bundle from "../bundler";
import Preview from "../components/preview";
import ReactEditor from "../components/reactEditor";
import Resizable from "../components/resizable";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import { getProjectData } from "../state";
import { useAppSelector } from "../state/hooks";

const ReactProject = () => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [input, setInput] = useState("");
  const { reactCode } = useAppSelector(getProjectData);

  useEffect(() => {
    console.log("Bundlin....", reactCode);
    const timer = setTimeout(async () => {
      const output = await bundle(reactCode);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [reactCode]);

  return (
    <>
      <div className="reactProjectWrapper">
        <Resizable direction="vertical-react">
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
            }}
          >
            <Resizable direction="horizontal-react">
              <ReactEditor />
            </Resizable>
            <Preview code={code} err={err} />
          </div>
        </Resizable>
      </div>
    </>
  );
};

export default ReactProject;
