import React from "react";
import "./reactProject.css";
import { useState, useEffect } from "react";
import bundle from "../bundler";
import Preview from "../components/preview";
import ReactEditor from "../components/reactEditor";
import Resizable from "../components/resizable";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import { DeleteCells, getProjectData } from "../state";
import { useAppDispatch, useAppSelector } from "../state/hooks";

const ReactProject = ({ cell }: any) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [input, setInput] = useState("");
  const { reactCode } = useAppSelector(getProjectData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //FOR DELETE
    console.log("single cell", cell.cellId);
    console.log("single cell code", cell.cellCode);
  }, [cell.cellCode]);

  useEffect(() => {
    console.log("Bundlin....", cell.cellCode);
    const timer = setTimeout(async () => {
      const output = await bundle(cell.cellCode);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell]);

  const handleDeleteCells = () => {
    dispatch(DeleteCells({ cellId: cell.cellId }));
  };

  return (
    <>
      <div className="reactProjectWrapper">
        <div>
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
                <ReactEditor cell={cell} />
              </Resizable>
              <Preview code={code} err={err} />
            </div>
          </Resizable>
        </div>

        <button onClick={handleDeleteCells} className=" abutton deleteButton">
          Delete{" "}
        </button>
      </div>
    </>
  );
};

export default ReactProject;
