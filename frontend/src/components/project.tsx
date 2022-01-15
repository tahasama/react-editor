import React from "react";
import { FcOpenedFolder } from "react-icons/fc";

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
        <div className="projectfooter">
          <p>
            Description :<span className="desc">{proj.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Project;
