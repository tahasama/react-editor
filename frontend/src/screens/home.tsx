import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";

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
    <div>
      <TopBar />
      <SideBar />

      <div className="home">
        <h3 className="intro">Welcome to ThaCoder,</h3>
        <h5 className="intro intro2">
          got an idea? want to learn? or having fun with code? Start now !!!
        </h5>
        <div className="buttonWrapper">
          <button className="buttona a" onClick={handleNewProjectClick}>
            New Project
          </button>
          <button className="buttona b" onClick={handleOpenProjectClick}>
            Open project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
