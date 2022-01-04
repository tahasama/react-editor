import { Link } from "react-router-dom";
import "./sideBar.css";
import { FaReact } from "react-icons/fa";
import { FcOpenedFolder } from "react-icons/fc";
import {
  AiFillEdit,
  AiFillHome,
  AiFillSave,
  AiFillDelete,
} from "react-icons/ai";
import { useState } from "react";

const SideBar = ({
  handleSaveProject,
  handleOpenProjectClick,
  handleNewProjectClick,
  handleDeleteProjectClick,
  id,
}: any) => {
  const [show, setShow] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);

  return (
    <nav className="side-bar">
      <Link
        className="side c"
        to="/"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <AiFillHome />
        {show && <div className="message">Home</div>}
      </Link>

      {id && (
        <Link
          to={""}
          className="side "
          onMouseEnter={() => setShow4(true)}
          onMouseLeave={() => setShow4(false)}
          onClick={handleSaveProject}
        >
          <AiFillSave />
          {show4 && <div className="message">Save</div>}
        </Link>
      )}

      <Link
        className="side b"
        to="/create"
        onMouseEnter={() => setShow3(true)}
        onMouseLeave={() => setShow3(false)}
        onClick={handleNewProjectClick}
      >
        <AiFillEdit />
        {show3 && (
          <div className="message">Html, Css, and JavaScript Editor</div>
        )}
      </Link>

      <Link
        className="side e"
        onMouseEnter={() => setShow6(true)}
        onMouseLeave={() => setShow6(false)}
        onClick={handleOpenProjectClick}
        to="/projects"
      >
        <FcOpenedFolder />
        {show6 && <div className="message">Open Project</div>}
      </Link>
      {id && (
        <button
          className="side d butt"
          onMouseEnter={() => setShow5(true)}
          onMouseLeave={() => setShow5(false)}
          onClick={handleDeleteProjectClick}
        >
          <AiFillDelete />
          {show5 && <div className="message">Delete</div>}
        </button>
      )}
    </nav>
  );
};

export default SideBar;
