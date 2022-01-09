import { Link, useParams } from "react-router-dom";
import "./sideBar.css";
import { FcOpenedFolder } from "react-icons/fc";
import {
  AiFillEdit,
  AiFillHome,
  AiFillSave,
  AiFillDelete,
  AiOutlineFolderOpen,
} from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { useReducer } from "react";
import { useAppSelector } from "../state/hooks";
import { useDispatch } from "react-redux";
import { barState } from "../state/reducers/sideBarSlice";
import { cleanState } from "../state";

const SideBar = ({ remove, save, update }: any) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bar = useAppSelector((state) => state.bar);

  return (
    <div className="sideBarContainer">
      <nav className="side-bar">
        <Link
          className="side c"
          to="/"
          onMouseEnter={() => dispatch(barState({ type: "Home" }))}
          onMouseLeave={() => dispatch(barState({ type: "Default" }))}
        >
          <div className="iconSide">
            <AiFillHome />
          </div>
          {bar.home && <div className="message">Home</div>}
        </Link>
        {id && (
          <Link
            to={""}
            className="side a"
            onMouseEnter={() => dispatch(barState({ type: "Save" }))}
            onMouseLeave={() => dispatch(barState({ type: "Default" }))}
            onClick={save}
          >
            {" "}
            <div className="iconSide">
              <AiFillSave />{" "}
            </div>
            {bar.save && <div className="message">Save</div>}
          </Link>
        )}
        {id && (
          <Link
            to={"/create"}
            className="side e"
            onMouseEnter={() => dispatch(barState({ type: "Edit" }))}
            onMouseLeave={() => dispatch(barState({ type: "Default" }))}
            onClick={update}
          >
            <div className="iconSide">
              <AiFillEdit />{" "}
            </div>
            {bar.edit && <div className="message">Edit project's infos</div>}
          </Link>
        )}

        <Link
          className="side b"
          to="/create"
          onMouseEnter={() => dispatch(barState({ type: "New" }))}
          onMouseLeave={() => dispatch(barState({ type: "Default" }))}
          onClick={dispatch(cleanState)}
        >
          <div className="iconSide">
            <MdAddCircleOutline />
          </div>
          {bar.new && <div className="message">New Project</div>}
        </Link>

        <Link
          className="side f"
          to="/projects"
          onMouseEnter={() => dispatch(barState({ type: "Open" }))}
          onMouseLeave={() => dispatch(barState({ type: "Default" }))}
        >
          <div className="iconSide">
            <AiOutlineFolderOpen />
          </div>
          {bar.open && <div className="message">Open Project</div>}
        </Link>
        {id && (
          <button
            className="side d butt"
            onMouseEnter={() => dispatch(barState({ type: "Delete" }))}
            onMouseLeave={() => dispatch(barState({ type: "Default" }))}
            onClick={remove}
          >
            <div className="iconSide">
              <AiFillDelete />
            </div>
            {bar.delete && <div className="message">Delete</div>}
          </button>
        )}
      </nav>
    </div>
  );
};

export default SideBar;
