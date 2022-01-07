import React from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { Link } from "react-router-dom";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import { getProjectData, getProjectsData } from "../state";
import { useAppSelector } from "../state/hooks";

const SearchResult = () => {
  const data = useAppSelector(getProjectsData);
  const { _id } = useAppSelector(getProjectData);

  const projects = data.flat();
  console.log("resultat", projects);
  return (
    <div>
      <div className="projectsList">
        {projects.length !== 0 ? (
          projects.map((proj: any) => (
            <div key={proj._id}>
              {proj._id && (
                <Link to={"/editor/" + proj._id} className="project">
                  <FcOpenedFolder className="icon" />
                  <p className="name">{proj.title}</p>
                </Link>
              )}
            </div>
          ))
        ) : (
          <h2>No result..</h2>
        )}
      </div>

      <TopBar />
      <SideBar />
    </div>
  );
};

export default SearchResult;
