import { Link, useParams } from "react-router-dom";
import "./sideBar.css";
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
import { cleanState, projectInitialState } from "../state";

const SideBar = ({ remove, save }: any) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bar = useAppSelector((state) => state.bar);

  return (
    <div className="sideBarContainer">
      <nav className="side-bar">
        <Link
          className="side c"
          to="/"
          onMouseEnter={() => dispatch(barState({ home: true }))}
          onMouseLeave={() => dispatch(barState(sideBArInitialState))}
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
          <Link
            to={"/create"}
            className="side e"
            onMouseEnter={() => dispatch(barState({ edit: true }))}
            onMouseLeave={() => dispatch(barState(sideBArInitialState))}
            onClick={save}
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
          onMouseEnter={() => dispatch(barState({ new: true }))}
          onMouseLeave={() => dispatch(barState(sideBArInitialState))}
          onClick={() => dispatch(cleanState(projectInitialState))}
        >
          <div className="iconSide">
            <MdAddCircleOutline />
          </div>
          {bar.new && <div className="message">New Project</div>}
        </Link>

        <Link
          className="side f"
          to="/projects"
          onMouseEnter={() => dispatch(barState({ open: true }))}
          onMouseLeave={() => dispatch(barState(sideBArInitialState))}
        >
          <div className="iconSide">
            <AiOutlineFolderOpen />
          </div>
          {bar.open && <div className="message">Open Project</div>}
        </Link>
        {id && (
          <button
            className="side d butt"
            onMouseEnter={() => dispatch(barState({ delete: true }))}
            onMouseLeave={() => dispatch(barState(sideBArInitialState))}
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
function resetBarState(resetBarState: any): void {
  throw new Error("Function not implemented.");
}
