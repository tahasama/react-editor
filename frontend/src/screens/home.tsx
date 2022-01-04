import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../components/sideBar";

import "./home.css";
import { FcOpenedFolder } from "react-icons/fc";

const Home = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleNewProjectClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    navigate("/create");
  };

  const handleOpenProjectClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    navigate("/projects");
  };

  return (
    <div className="home">
      <h3 className="intro">
        Welcome to ThaCoder, got an idea? want to learn? or having fun with
        code? Start now !!!
      </h3>
      <button className="button a" onClick={handleNewProjectClick}>
        Start a new Project
      </button>
      <button className="button b" onClick={handleOpenProjectClick}>
        Open a project
      </button>
      <SideBar
        handleNewProjectClick={handleNewProjectClick}
        handleOpenProjectClick={handleOpenProjectClick}
      />
    </div>
  );
};

export default Home;
