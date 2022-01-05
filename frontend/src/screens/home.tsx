import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";

import "./home.css";

const Home = () => {
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
      <SideBar />
    </div>
  );
};

export default Home;
