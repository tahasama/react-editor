import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { cleanState, creatProject, getProjectData } from "../state/";

import "./createProject.css";
import TopBar from "../components/topBar";

const CreateProject: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { _id, err } = useAppSelector(getProjectData);

  useEffect(() => {
    inputRef?.current?.focus();
    if (_id !== undefined && _id !== "") {
      navigate("/editor/" + _id);
    }
    return () => {
      dispatch(cleanState());
    };
  }, [_id]);

  const handleNewProjectCreate: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault();
    dispatch(creatProject(inputRef.current?.value));
  };

  return (
    <div className="container">
      <TopBar />
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
          {err && <p className="error"> {err}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
