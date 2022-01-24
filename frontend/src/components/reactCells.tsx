import React, { useEffect, useState } from "react";
import { AddCells, getProjectData } from "../state";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import ReactProject from "./reactProject";
import { v4 as uuidv4 } from "uuid";
import { example1, example2 } from "../example";
import { useLocation } from "react-router-dom";

const ReactCells = () => {
  const { cells } = useAppSelector(getProjectData);
  const dispatch = useAppDispatch();
  const [cellz, setCellz] = useState([{}]);
  const location = useLocation();

  //   dispatch(AddCells({ cellId: uuidv4(), cellCode: example1 }));
  //     dispatch(AddCells({ cellId: uuidv4(), cellCode: example2 }));
  const handleAddCells = () => {
    dispatch(AddCells({ cellId: uuidv4(), cellCode: "" }));
  };

  useEffect(() => {
    if (location.pathname.includes("code-and-run")) {
      dispatch(AddCells({ cellId: uuidv4(), cellCode: example2 }));
      dispatch(AddCells({ cellId: uuidv4(), cellCode: example1 }));
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        {cells?.map((cell) => {
          return (
            <div className="cells" key={cell.cellId}>
              <ReactProject cell={cell} />
            </div>
          );
        })}
      </div>
      <button onClick={handleAddCells} className="addCell">
        Add Cell
      </button>
    </div>
  );
};

export default ReactCells;
