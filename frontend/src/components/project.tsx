import React from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { Link } from "react-router-dom";

const Project = ({ proj }: any) => {
  return (
    <div>
      <div className="project">
        <div className="projectHeader">
          <FcOpenedFolder className="icon" />
          <p className="name">{proj.title}</p>
        </div>
        <p className="dateList">
          Created : {new Date(proj.createdAt).toString().slice(0, 16)}
        </p>
        <Link className="dateList" to={`/profile/${proj.uid}`}>
          p by: {proj.email}
        </Link>
        <div className="projectfooter">
          <p>
            <span className="desc">{proj.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Project;
