import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import { cleanState, projectInitialState } from "../state";
import { useAppSelector } from "../state/hooks";
import { getAuthData } from "../state/reducers/authSlice";
import { SiJavascript } from "react-icons/si";
import { AiFillHtml5 } from "react-icons/ai";
import { DiCss3 } from "react-icons/di";
import { DiReact } from "react-icons/di";

import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid } = useAppSelector(getAuthData);

  const handleNewProjectClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (uid) {
      dispatch(cleanState(projectInitialState));
      navigate("/create");
    } else {
      navigate("/editor/react/code-and-run");
    }
  };

  const handleOpenProjectClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (uid) {
      navigate("/projects");
    } else {
      navigate("/editor/code-and-run");
    }
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
            {uid ? (
              <p> New Project</p>
            ) : (
              <p style={{ position: "relative" }}>
                <span className="reactLogos">
                  <DiReact />
                </span>{" "}
                <span className="logoName">React Js</span>
              </p>
            )}
          </button>
          <button className="buttona b" onClick={handleOpenProjectClick}>
            {uid ? (
              <p> Open project</p>
            ) : (
              <p className="logos">
                <span>
                  <SiJavascript className="f" />
                </span>
                <span>
                  <AiFillHtml5 className="h" />
                </span>
                <span>
                  <DiCss3 className="i" />
                </span>
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
