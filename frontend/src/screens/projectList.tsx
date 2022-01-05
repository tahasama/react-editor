import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { Link } from "react-router-dom";
import SideBar from "../components/sideBar";
import "./projectsList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const getProjectsList = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/project/");
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <div className="projectsList">
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
