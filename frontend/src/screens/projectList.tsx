import React, { useEffect } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useAppSelector } from "../state/hooks";
import { fetchAllProject } from "../state/";

import "./projectsList.css";
import { getProjectsData } from "../state/";
import TopBar from "../components/topBar";

const ProjectList = () => {
  const dispatch = useDispatch();
  const data = useAppSelector(getProjectsData);
  const projects = data.flat();

  const getProjectsList = async () => {
    dispatch(fetchAllProject());
  };
  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <div className="projectsList">
      <TopBar />
      <SideBar />
      {projects.map((proj: any) => (
        <div key={proj._id}>
          <Link to={"/editor/" + proj._id} className="project">
            <FcOpenedFolder className="icon" />
            <p className="name">{proj.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
