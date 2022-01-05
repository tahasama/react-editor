import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import FullEditor from "../screens/fullEditor";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { createMyProject, creatProject, getMyProject } from "../state/reducers";
import { store } from "../state/store";
// import { create_project } from "../state/reducers";

import "./createProject.css";

const CreateProject: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const _id = useAppSelector(createMyProject);
  navigate("/editor/" + _id);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleNewProjectCreate: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault();
    dispatch(creatProject(inputRef.current?.value));
  };

  return (
    <div className="container">
      <SideBar inputRef={inputRef} />
      <div className="modalContainer">
        <div className="modal">
          <header className="modalHeader">
            <h4 className="modalHeaderTitle"> Project name : </h4>
          </header>
          <footer className="modalFooter">
            <input className="createInput" type="text" ref={inputRef} />
            <button className="createButton" onClick={handleNewProjectCreate}>
              Create project
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
