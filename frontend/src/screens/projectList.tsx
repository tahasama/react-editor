import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { fetchAllProject, searchProject, updateLoading } from "../state/";

import "./projectsList.css";
import { getProjectsData } from "../state/";
import TopBar from "../components/topBar";
import Project from "../components/project";
import { getAuthData } from "../state/reducers/authSlice";

const ProjectList = () => {
  const dispatch = useAppDispatch();
  const { title } = useParams();
  const query = title?.toString();
  const { uid } = useAppSelector(getAuthData);
  const navigate = useNavigate();

  const { all, loading, searchAll } = useAppSelector(getProjectsData);

  const projects = (query !== undefined ? searchAll : all).flat();

  const [filtered, setFiltered] = useState("");
  const sorted = projects.sort((a: any, b: any) => {
    return b.star.length - a.star.length;
  });

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
  }, [query, projects, uid, dispatch]);

  return (
    <div>
      <SideBar />
      <TopBar />

      {!loading ? (
        <div className="lisContainer">
          <div className="projectsList">
            <div className="filterContainer">
              <p className="filterLabel">Filter by : </p>
              <button
                className="filterName"
                onClick={() => setFiltered("byDate")}
              >
                Date
              </button>
              <button
                className="filterName"
                onClick={() => setFiltered("byStars")}
              >
                Stars
              </button>
            </div>

            {projects[0] !== undefined &&
              (filtered === "byDate"
                ? projects.reverse()
                : filtered === "byStars"
                ? sorted
                : projects
              ).map((proj: any) => (
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
