import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./navBar.css";
import {
  AiFillEdit,
  AiFillHome,
  AiFillSave,
  AiFillDelete,
  AiOutlineFolderOpen,
  AiTwotoneStar,
  AiOutlineStar,
} from "react-icons/ai";
import { HiOutlineCode } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { FaRegClone } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { useAppSelector } from "../state/hooks";
import { useDispatch } from "react-redux";
import { barState, sideBArInitialState } from "../state/reducers/sideBarSlice";
import {
  cleanState,
  getProjectData,
  projectInitialState,
  StarProject,
  updateSaved,
} from "../state";
import { getUserData } from "../state/reducers/userSlice";
import { getAuthData } from "../state/reducers/authSlice";

const SideBar = ({ remove, save, clone }: any) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const bar = useAppSelector((state) => state.bar);
  const { saved, _id, user, star } = useAppSelector(getProjectData);
  const {} = useAppSelector(getUserData);
  const { uid } = useAppSelector(getAuthData);
  const location = useLocation();

  const alerted = (destination: string) => {
    if (!saved) {
      const result = window.confirm("are you sure you want to leave? ");
      if (result) {
        dispatch(updateSaved(true));
        navigate(destination);
      } else {
        navigate("");
      }
    } else {
      navigate(destination);
    }
  };
  const handleStar = (e: any) => {
    e.preventDefault();
    const starArray = [...star];
    if (star.includes(uid)) {
      const starArrayIndex = starArray.indexOf(uid);
      if (starArrayIndex !== -1) {
        starArray.splice(starArrayIndex, 1);
      }
      dispatch(StarProject({ _id: id, star: starArray }));
    } else {
      starArray.push(uid);
      dispatch(StarProject({ _id: id, star: starArray }));
    }
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
        {!uid && (
          <>
            <button
              className="side d but"
              onMouseEnter={() => dispatch(barState({ code: true }))}
              onMouseLeave={() => dispatch(barState(sideBArInitialState))}
              onClick={() => (
                navigate("/editor/code-and-run"),
                dispatch(cleanState(projectInitialState))
              )}
            >
              <div className="iconSide">
                <HiOutlineCode />
              </div>{" "}
              {bar.code && <div className="message">Code and Run</div>}
            </button>
          </>
        )}
        {uid && (
          <>
            <button
              className="side b but"
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
            </button>
            {id && uid === user && (
              <>
                {!location.pathname.startsWith("/profile") && (
                  <>
                    <button
                      className="side a but"
                      onMouseEnter={() => dispatch(barState({ save: true }))}
                      onMouseLeave={() =>
                        dispatch(barState(sideBArInitialState))
                      }
                      onClick={save}
                    >
                      <div className="iconSide">
                        <AiFillSave />
                      </div>
                      {bar.save && <div className="message in">Save</div>}
                    </button>
                    <button
                      className="side e but"
                      onMouseEnter={() => dispatch(barState({ edit: true }))}
                      onMouseLeave={() =>
                        dispatch(barState(sideBArInitialState))
                      }
                      onClick={() => alerted("/create")}
                    >
                      <div className="iconSide">
                        <AiFillEdit />{" "}
                      </div>
                      {bar.edit && (
                        <div className="message">Edit project's infos</div>
                      )}
                    </button>
                  </>
                )}
              </>
            )}

            <button
              className="side f but"
              onMouseEnter={() => dispatch(barState({ open: true }))}
              onMouseLeave={() => dispatch(barState(sideBArInitialState))}
              onClick={() => alerted("/projects")}
            >
              <div className="iconSide">
                <AiOutlineFolderOpen />
              </div>
              {bar.open && <div className="message">Open Project</div>}
            </button>
            {id && uid === user && !location.pathname.startsWith("/profile") && (
              <button
                className="side d but"
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
            {uid !== user &&
              params.id &&
              !location.pathname.startsWith("/profile") && (
                <>
                  <button
                    className="side g but"
                    onMouseEnter={() => dispatch(barState({ delete: true }))}
                    onMouseLeave={() => dispatch(barState(sideBArInitialState))}
                    onClick={clone}
                  >
                    <div className="iconSide sizeIt">
                      <FaRegClone />
                    </div>
                    {bar.delete && <div className="message">Clone Project</div>}
                  </button>
                  <button
                    className="side a but"
                    onMouseEnter={() => dispatch(barState({ edit: true }))}
                    onMouseLeave={() => dispatch(barState(sideBArInitialState))}
                    onClick={() => alerted("/profile/" + user)}
                  >
                    <div className="iconSide sizeIt">
                      <ImProfile />
                    </div>
                    {bar.edit && (
                      <div className="message">Authors's Profile</div>
                    )}
                  </button>
                  <button
                    className="side a but"
                    onMouseEnter={() => dispatch(barState({ star: true }))}
                    onMouseLeave={() => dispatch(barState(sideBArInitialState))}
                    onClick={handleStar}
                  >
                    {!star.includes(uid) ? (
                      <div>
                        <div className="iconSide sizeIt starColor">
                          <AiOutlineStar />
                        </div>
                        {bar.star && (
                          <div className="message">Give it a Star</div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="iconSide sizeIt starColor">
                          <AiTwotoneStar />
                        </div>
                        {bar.star && (
                          <div className="message">
                            you rated this project. unrate it?{" "}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                </>
              )}
          </>
        )}
      </nav>
    </div>
  );
};

export default SideBar;
