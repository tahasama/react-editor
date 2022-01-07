import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import { getProjectData, getProjectsData, searchProject } from "../state";
import { useAppSelector } from "../state/hooks";

import "./home.css";

const Home = () => {
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <div className="home">
        <div>
          <h3 className="intro">
            Welcome to ThaCoder, got an idea? want to learn? or having fun with
            code? Start now !!!
          </h3>
          <div className="buttonWrapper">
            <button className="buttona a" onClick={handleNewProjectClick}>
              Start a new Project
            </button>
            <button className="buttona b" onClick={handleOpenProjectClick}>
              Open a project
            </button>
          </div>
        </div>

        <TopBar />
        <SideBar />

        {message && <h3>Sorry, we couldnt find any results..</h3>}
      </div>
    </div>
  );
};

export default Home;
