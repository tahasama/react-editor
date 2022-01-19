import React, { FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  creatProject,
  getProjectData,
  saveProject,
  updateProjectInfos,
} from "../state/";

import "./createProject.css";
import TopBar from "../components/topBar";
import { getUserData } from "../state/reducers/userSlice";
import { getAuthData } from "../state/reducers/authSlice";

const CreateProject: React.FC = () => {
  const nameRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const [toUpdate, setToUpdate] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(getAuthData);

  const {
    _id,
    title,
    description,
    code: { html, css, js },
  } = useAppSelector(getProjectData);

  const { username } = useAppSelector(getUserData);
  const { uid } = useAppSelector(getAuthData);

  setTimeout(() => {
    if (!toUpdate) {
      navigate("/editor/" + _id);
    }
  }, 3000);

  const handleNewProjectCreate: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (_id) {
      setToUpdate(true);
      dispatch(
        saveProject({
          _id: _id,
          title: nameRef.current?.value,
          description: descriptionRef.current?.value,
          code: { html: html, css: css, js: js },
        })
      );
      navigate("/editor/" + _id);
    } else {
      setToUpdate(false);
      dispatch(
        creatProject({
          uid: uid,
          email: email,
          username: username,
          title: nameRef.current?.value,
          description: descriptionRef.current?.value,
        })
      );
    }
  };

  return (
    <div className="container">
      <TopBar />
      <SideBar />
      <div className="modalContainer">
        <div className="modal">
          <form onSubmit={handleNewProjectCreate}>
            <header className="modalHeader">
              <h4 className="modalHeaderTitle"> Project name : </h4>
            </header>
            <footer className="modalFooter">
              <input
                className="createInput"
                type="text"
                ref={nameRef}
                value={title}
                onChange={() =>
                  dispatch(
                    updateProjectInfos({ title: nameRef.current?.value })
                  )
                }
              />
            </footer>
            <header className="modalHeader">
              <h4 className="modalHeaderTitle"> Description : </h4>
            </header>
            <footer className="modalFooter">
              <textarea
                className="createInput"
                rows={8}
                ref={descriptionRef}
                value={description}
                onChange={() =>
                  dispatch(
                    updateProjectInfos({
                      description: descriptionRef.current?.value,
                    })
                  )
                }
              />
              <button className="createButton" type="submit">
                {_id ? (
                  <p className="pbutton">Save project</p>
                ) : (
                  <p className="pbutton">Create project</p>
                )}
              </button>
            </footer>
          </form>
          {!toUpdate && <p className="creating">Creating project ...</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
