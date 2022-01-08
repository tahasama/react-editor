import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  cleanState,
  creatProject,
  getProjectData,
  saveProject,
  updateDate,
  updateDescription,
  updateTitle,
} from "../state/";

import "./createProject.css";
import TopBar from "../components/topBar";
import { idText } from "typescript";

const CreateProject: React.FC = () => {
  const nameRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    _id,
    title,
    description,
    code: { html, css, js },
    updatedAt,
  } = useAppSelector(getProjectData);

  console.log(" 'my id, ", _id);
  console.log(" 'my description, ", description);

  useEffect(() => {
    nameRef?.current?.focus();
    // if (_id !== undefined && _id !== "") {
    //   navigate("/editor/" + _id);
    // }
    // return () => {
    //   dispatch(cleanState());
    // };
    // }, [_id]);
  }, []);

  const handleNewProjectCreate: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    {
      _id
        ? dispatch(
            saveProject({
              _id: _id,
              title: nameRef.current?.value,
              description: descriptionRef.current?.value,
              code: { html: html, css: css, js: js },
            })
          )
        : dispatch(
            creatProject({
              name: nameRef.current?.value,
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
                onChange={() => dispatch(updateTitle(nameRef.current?.value))}
              />
            </footer>
            <header className="modalHeader">
              <h4 className="modalHeaderTitle"> Description : </h4>
            </header>
            <footer className="modalFooter">
              <textarea
                className="createInput"
                rows={5}
                ref={descriptionRef}
                value={description}
                onChange={() =>
                  dispatch(updateDescription(descriptionRef.current?.value))
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
          {/* {err && <p className="error"> {err}</p>} */}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
