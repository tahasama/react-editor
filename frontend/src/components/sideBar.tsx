import { Link, useParams } from "react-router-dom";
import "./sideBar.css";
import { FcOpenedFolder } from "react-icons/fc";
import {
  AiFillEdit,
  AiFillHome,
  AiFillSave,
  AiFillDelete,
} from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { useReducer } from "react";
import { useAppSelector } from "../state/hooks";
import { useDispatch } from "react-redux";
import { barState } from "../state/reducers/sideBarSlice";

const SideBar = ({ remove, save }: any) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bar = useAppSelector((state) => state.bar);
  console.log("baaaaaaaaaaaar", bar.home);

  return (
    <nav className="side-bar">
      <Link
        className="side c"
        to="/"
        onMouseEnter={() => dispatch(barState({ type: "Home" }))}
        onMouseLeave={() => dispatch(barState({ type: "Default" }))}
      >
        <AiFillHome />
        {bar.home && <div className="message">Home</div>}
      </Link>
      {id && (
        <Link
          to={""}
          className="side "
          onMouseEnter={() => dispatch(barState({ type: "Save" }))}
          onMouseLeave={() => dispatch(barState({ type: "Default" }))}
          onClick={save}
        >
          <AiFillSave />
          {bar.save && <div className="message">Save</div>}
        </Link>
      )}

      <Link
        className="side b"
        to="/create"
        onMouseEnter={() => dispatch(barState({ type: "New" }))}
        onMouseLeave={() => dispatch(barState({ type: "Default" }))}
      >
        <MdAddCircleOutline />

        {bar.new && (
          <div className="message">Html, Css, and JavaScript Editor</div>
        )}
      </Link>

      <Link
        className="side e"
        to="/projects"
        onMouseEnter={() => dispatch(barState({ type: "Open" }))}
        onMouseLeave={() => dispatch(barState({ type: "Default" }))}
      >
        <FcOpenedFolder />
        {bar.open && <div className="message">Open Project</div>}
      </Link>
      {id && (
        <button
          className="side d butt"
          onMouseEnter={() => dispatch(barState({ type: "Delete" }))}
          onMouseLeave={() => dispatch(barState({ type: "Default" }))}
          onClick={remove}
        >
          <AiFillDelete />
          {bar.delete && <div className="message">Delete</div>}
        </button>
      )}
    </nav>
  );
};

export default SideBar;
