import { Link } from "react-router-dom";
import "./sideBar.css";
import { FcOpenedFolder } from "react-icons/fc";
import {
  AiFillEdit,
  AiFillHome,
  AiFillSave,
  AiFillDelete,
} from "react-icons/ai";
import { useReducer } from "react";
import { creatProject } from "../state/reducers";

const SideBar = ({
  handleSaveProject,
  handleDeleteProjectClick,
  id,
  inputRef,
}: any) => {
  const initialState = {
    home: false,
    new: false,
    save: false,
    open: false,
    delete: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  function reducer(state = initialState, action: any) {
    let newState;
    switch (action.type) {
      case "Home":
        newState = { ...state, home: true };
        break;
      case "Save":
        newState = { ...state, save: true };
        break;
      case "New":
        newState = { ...state, new: true };
        break;
      case "Open":
        newState = { ...state, open: true };
        break;
      case "Delete":
        newState = { ...state, delete: true };
        break;
      case "Default":
        return initialState;
      default:
        return state;
    }
    return newState;
  }

  return (
    <nav className="side-bar">
      <Link
        className="side c"
        to="/"
        onMouseEnter={() => dispatch({ type: "Home" })}
        onMouseLeave={() => dispatch({ type: "Default" })}
      >
        <AiFillHome />
        {state.home && <div className="message">Home</div>}
      </Link>

      {id && (
        <Link
          to={""}
          className="side "
          onMouseEnter={() => dispatch({ type: "Save" })}
          onMouseLeave={() => dispatch({ type: "Default" })}
          onClick={handleSaveProject}
        >
          <AiFillSave />
          {state.save && <div className="message">Save</div>}
        </Link>
      )}

      <Link
        className="side b"
        to="/create"
        onMouseEnter={() => dispatch({ type: "New" })}
        onMouseLeave={() => dispatch({ type: "Default" })}
      >
        <AiFillEdit />
        {state.new && (
          <div className="message">Html, Css, and JavaScript Editor</div>
        )}
      </Link>

      <Link
        className="side e"
        to="/projects"
        onMouseEnter={() => dispatch({ type: "Open" })}
        onMouseLeave={() => dispatch({ type: "Default" })}
      >
        <FcOpenedFolder />
        {state.open && <div className="message">Open Project</div>}
      </Link>
      {id && (
        <button
          className="side d butt"
          onMouseEnter={() => dispatch({ type: "Delete" })}
          onMouseLeave={() => dispatch({ type: "Default" })}
          onClick={handleDeleteProjectClick}
        >
          <AiFillDelete />
          {state.delete && <div className="message">Delete</div>}
        </button>
      )}
    </nav>
  );
};

export default SideBar;
