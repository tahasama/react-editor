import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useAppSelector } from "../state/hooks";
import { fetchAllProject, searchProject, updateLoading } from "../state/";

import "./projectsList.css";
import { getProjectsData } from "../state/";
import TopBar from "../components/topBar";
import { getUserData } from "../state/reducers/userSlice";
import Project from "../components/project";
import { getAuthData } from "../state/reducers/authSlice";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { title } = useParams();
  const query = title?.toString();
  const { uid } = useAppSelector(getAuthData);
  const navigate = useNavigate();
  const location = useLocation();

  const { all, loading, searchAll } = useAppSelector(getProjectsData);

  // const projects = all.flat();

  // console.log(location);
  const projects = (query !== undefined ? searchAll : all).flat();

  // console.log("query", query);

  useEffect(() => {
    if (!projects) {
      dispatch(updateLoading(true));
    }
    if (query !== undefined && query !== "") {
      dispatch(searchProject(query));
    }
    setTimeout(() => {
      if (query === undefined) {
        dispatch(fetchAllProject(uid));
      }
    }, 100);
  }, [query, projects]);

  return (
    <div>
      <SideBar />
      <TopBar />

      {!loading ? (
        <div className="lisContainer">
          <div className="projectsList">
            {projects[0] !== undefined &&
              projects.map((proj: any) => (
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
