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
import { DiReact } from "react-icons/di";

import { HiOutlineCode } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { FaRegClone } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { useAppSelector } from "../state/hooks";
import { useDispatch } from "react-redux";
import { barState, sideBArInitialState } from "../state/reducers/sideBarSlice";
import {
  cleanState,
  cleanUpProjects,
  fetchAllProject,
  getProjectData,
  projectInitialState,
  StarProject,
  updateSaved,
  updateStar,
} from "../state";
import { getAuthData } from "../state/reducers/authSlice";
import { useState } from "react";

const SideBar = ({ remove, save, clone }: any) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const bar = useAppSelector((state) => state.bar);
  const { saved, user, star } = useAppSelector(getProjectData);
  const { uid } = useAppSelector(getAuthData);
  const location = useLocation();
  const [result, setResult] = useState(false);

  const alerted = (destination: string) => {
    if (!saved) {
      const result = window.confirm("are you sure you want to leave? ");
      setResult(result);
      console.log("DONT LEAVE....", result);
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
      dispatch(updateStar({ star: starArray }));
    } else {
      starArray.push(uid);
      dispatch(StarProject({ _id: id, star: starArray }));
      dispatch(updateStar({ star: starArray }));
    }
  };
  const handleOpenProject = () => {
    dispatch(cleanUpProjects([projectInitialState]));
    dispatch(fetchAllProject(uid));
    alerted("/projects");
  };
  const handleNewProject = () => {
    if (!saved) {
      const result = window.confirm("are you sure you want to leave? ");

      if (result) {
        dispatch(updateSaved(true));
        dispatch(cleanState(projectInitialState));
        navigate("/create");
      } else {
        navigate("");
      }
    } else {
      dispatch(cleanState(projectInitialState));
      navigate("/create");
    }
  };

  const handleCodeAndRun = () => {
    navigate("/editor/code-and-run");
    dispatch(cleanState(projectInitialState));
  };
  const handleReactCodeAndRun = () => {
    navigate("/editor/react/code-and-run");
    dispatch(cleanState(projectInitialState));
  };

  const handleAuthorsProfile = () => {
    dispatch(cleanUpProjects([projectInitialState]));
    dispatch(fetchAllProject(user));
    alerted("/profile/" + user);
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
              onClick={handleCodeAndRun}
            >
              <div className="iconSide">
                <HiOutlineCode />
              </div>{" "}
              {bar.code && <div className="message">Code and Run</div>}
            </button>
            <button
              className="but"
              onMouseEnter={() => dispatch(barState({ react: true }))}
              onMouseLeave={() => dispatch(barState(sideBArInitialState))}
              onClick={handleReactCodeAndRun}
            >
              <div className="iconSide reacticon">
                <DiReact />
              </div>{" "}
              {bar.react && (
                <div className="message reactmessage">React and Run</div>
              )}
            </button>
          </>
        )}
        {uid && (
          <>
            <button
              className="side b but"
              onMouseEnter={() => dispatch(barState({ new: true }))}
              onMouseLeave={() => dispatch(barState(sideBArInitialState))}
              onClick={handleNewProject}
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
              onClick={handleOpenProject}
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
                    onClick={handleAuthorsProfile}
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
