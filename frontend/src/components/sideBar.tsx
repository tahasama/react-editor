import { Link, useNavigate, useParams } from "react-router-dom";
import "./navBar.css";
import {
  AiFillEdit,
  AiFillHome,
  AiFillSave,
  AiFillDelete,
  AiOutlineFolderOpen,
} from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { useAppSelector } from "../state/hooks";
import { useDispatch } from "react-redux";
import { barState, sideBArInitialState } from "../state/reducers/sideBarSlice";
import {
  cleanState,
  getProjectData,
  projectInitialState,
  updateSaved,
} from "../state";
import { useEffect, useState } from "react";

const SideBar = ({ remove, save }: any) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bar = useAppSelector((state) => state.bar);
  const { saved } = useAppSelector(getProjectData);

  const alerted = (destination: string) => {
    if (!saved) {
      const result = window.confirm("are you sure you want to leave? ");
      if (result) {
        navigate(destination);
      }
    } else {
      navigate(destination);
    }
    dispatch(updateSaved(true));
  };

  return (
    <div className="sideBarContainer">
      <nav className="sideBar">
        <button
          className="side c but"
          onMouseEnter={() => dispatch(barState({ home: true }))}
          onMouseLeave={() => dispatch(barState(sideBArInitialState))}
          onClick={() => alerted("/")}
        >
          <div className="iconSide">
            <AiFillHome />
          </div>
          {bar.home && <div className="message">Home</div>}
        </button>
        {id && (
          <Link
            to={""}
            className="side a"
            onMouseEnter={() => dispatch(barState({ save: true }))}
            onMouseLeave={() => dispatch(barState(sideBArInitialState))}
            onClick={save}
          >
            <div className="iconSide">
              <AiFillSave />
            </div>
            {bar.save && <div className="message">Save</div>}
          </Link>
        )}
        {id && (
          <button
            // to={"/create"}
            className="side e but"
            onMouseEnter={() => dispatch(barState({ edit: true }))}
            onMouseLeave={() => dispatch(barState(sideBArInitialState))}
            onClick={() => alerted("/create")}
          >
            <div className="iconSide">
              <AiFillEdit />{" "}
            </div>
            {bar.edit && <div className="message">Edit project's infos</div>}
          </button>
        )}

        <Link
          className="side b"
          to="/create"
          onMouseEnter={() => dispatch(barState({ new: true }))}
          onMouseLeave={() => dispatch(barState(sideBArInitialState))}
          onClick={() => (
            dispatch(cleanState(projectInitialState)), alerted("/create")
          )}
        >
          <div className="iconSide">
            <MdAddCircleOutline />
          </div>
          {bar.new && <div className="message">New Project</div>}
        </Link>

        <button
          className="side f but"
          // to="/projects"
          onMouseEnter={() => dispatch(barState({ open: true }))}
          onMouseLeave={() => dispatch(barState(sideBArInitialState))}
          onClick={() => alerted("/projects")}
        >
          <div className="iconSide">
            <AiOutlineFolderOpen />
          </div>
          {bar.open && <div className="message">Open Project</div>}
        </button>
        {id && (
          <Link
            to=""
            className="side d "
            onMouseEnter={() => dispatch(barState({ delete: true }))}
            onMouseLeave={() => dispatch(barState(sideBArInitialState))}
            onClick={remove}
          >
            <div className="iconSide">
              <AiFillDelete />
            </div>
            {bar.delete && <div className="message">Delete</div>}
          </Link>
        )}
      </nav>
    </div>
  );
};

export default SideBar;
