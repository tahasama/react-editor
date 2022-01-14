import React, { useEffect } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useAppSelector } from "../state/hooks";
import { fetchAllProject, updateLoading } from "../state/";

import "./projectsList.css";
import { getProjectsData } from "../state/";
import TopBar from "../components/topBar";
import { getUserData } from "../state/reducers/userSlice";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { all, loading } = useAppSelector(getProjectsData);
  const projects = all.flat();
  const { title } = useParams();
  const query = title?.toString();
  const { email } = useAppSelector(getUserData);

  useEffect(() => {
    dispatch(updateLoading(true));
    setTimeout(() => {
      if (query === undefined) {
        dispatch(fetchAllProject(email));
      }
    }, 100);
  }, [query]);

  return (
    <div>
      <SideBar />
      <TopBar />
      {!loading ? (
        <div className="lisContainer">
          <div className="projectsList">
            {projects.map((proj: any) => (
              <div key={proj._id}>
                <Link to={"/editor/" + proj._id} className="projectLink">
                  <div className="project">
                    <div className="projectHeader">
                      <FcOpenedFolder className="icon" />
                      <p className="name">{proj.title}</p>
                    </div>
                    <p className="dateList">
                      Created :{" "}
                      {new Date(proj.createdAt).toString().slice(0, 16)}
                    </p>
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
            {query !== undefined && projects.length === 0 && (
              <h2 className="noResult">
                No project with this name has been found..
              </h2>
            )}
          </div>
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default ProjectList;
