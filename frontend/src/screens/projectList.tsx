import React, { useEffect } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useAppSelector } from "../state/hooks";
import { fetchAllProject, getProjectData, searchProject } from "../state/";

import "./projectsList.css";
import { getProjectsData } from "../state/";
import TopBar from "../components/topBar";

const ProjectList = () => {
  const dispatch = useDispatch();
  const data = useAppSelector(getProjectsData);
  const projects = data.flat();
  const { title } = useParams();
  const query = title?.toString();

  const getProjectsList = async () => {
    dispatch(fetchAllProject());
  };
  useEffect(() => {
    setTimeout(() => {
      if (query === undefined) {
        getProjectsList();
      }
    }, 100);
  }, [query]);

  return (
    <div>
      <SideBar />
      <TopBar />
      <div className="lisContainer">
        {projects.length !== 0 ? (
          <div className="projectsList">
            {projects.map((proj: any) => (
              <div key={proj._id}>
                <Link to={"/editor/" + proj._id} className="projectLink">
                  <div className="project">
                    <div className="projectHeader">
                      <FcOpenedFolder className="icon" />
                      <p className="name">{proj.title}</p>

                      <p className="date">
                        {new Date(proj.createdAt).toString().slice(0, 16)}
                      </p>
                    </div>

                    <div className="projectfooter">
                      <p>
                        Description :
                        <span className="desc">{proj.description}</span>
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="hr"></div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="noResult">
            No project with this name has been found..
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
