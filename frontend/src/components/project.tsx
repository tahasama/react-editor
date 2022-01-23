import React from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { AiTwotoneStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DiReact } from "react-icons/di";

const Project = ({ proj }: any) => {
  const nbStars = proj.star.length;

  return (
    <div>
      <div className="project">
        <div className="projectHeader">
          {proj.type !== "reactProject" ? (
            <FcOpenedFolder className="icon" />
          ) : (
            <span style={{ fontSize: 40, color: "blue", opacity: 0.7 }}>
              <DiReact />
            </span>
          )}
          <p className="name">{proj.title}</p>
        </div>
        <div className="projectHeaderStar">
          <p className="nameStar">{nbStars}</p>
          <AiTwotoneStar className="iconStar" />
        </div>
        <p className="dateList onProjects">
          Created : {new Date(proj.createdAt).toString().slice(0, 16)}
        </p>
        <Link className="dateList onProjects hovery" to="">
          {proj.username ? <>by: {proj.username}</> : <>by: {proj.email}</>}
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
