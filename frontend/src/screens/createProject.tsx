import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import FullEditor from "../screens/fullEditor";

import "./createProject.css";

const CreateProject: React.FC = () => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleNewProjectChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setName(e.target.value);
  };
  const handleNewProjectCreate: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault();

    const newPost = {
      name: name,
      code: {
        html: "",
        css: "",
        js: "",
      },
    };
    console.log("here is a new post", newPost);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/project/",
        newPost
      );
      navigate("/editor/" + data._id);
    } catch (error) {
      console.log("here is a new error", error);
    }
  };

  return (
    <div className="container">
      <SideBar />
      <div className="modalContainer">
        <div className="modal">
          <header className="modalHeader">
            <h4 className="modalHeaderTitle"> Project name : </h4>
          </header>
          <footer className="modalFooter">
            <input
              className="createInput"
              type="text"
              value={name}
              onChange={handleNewProjectChange}
              ref={inputRef}
            />
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
