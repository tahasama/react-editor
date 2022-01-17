import React, { useEffect } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useAppSelector } from "../state/hooks";
import { fetchAllProject, updateLoading } from "../state/";

import "./projectsList.css";
import { getProjectsData } from "../state/";
import TopBar from "../components/topBar";
import { getUserData } from "../state/reducers/userSlice";
import Project from "../components/project";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { all, loading } = useAppSelector(getProjectsData);
  const projects = all.flat();
  const { title } = useParams();
  const query = title?.toString();
  const { email, uid } = useAppSelector(getUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!projects) {
      dispatch(updateLoading(true));
    }

    setTimeout(() => {
      if (query === undefined) {
        dispatch(fetchAllProject(uid));
      }
    }, 100);
    // return () => {
    //   dispatch(updateLoading(false));
    // };
  }, [query, projects]);

  return (
    <div>
      <SideBar />
      <TopBar />

      {!loading ? (
        <div className="lisContainer">
          <div className="projectsList">
            {projects.map((proj: any) => (
              <div key={proj._id}>
                <button
                  onClick={() => navigate("/editor/" + proj._id)}
                  className="projectLink but"
                >
                  <Project proj={proj} />
                </button>
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
