import { Link, useNavigate, useParams } from "react-router-dom";
import "./sideBar.css";

import { useDispatch } from "react-redux";
import { searchProject } from "../state";
import { useEffect, useRef } from "react";

const TopBar = () => {
  const { title } = useParams();
  console.log("useparams yo", title);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<any>(null);

  useEffect(() => {
    searchRef.current.focus();
    dispatch(searchProject(title));
  }, [title]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log("top baaar", searchRef.current?.value);
    dispatch(searchProject(searchRef.current?.value));
    navigate("/search/q=" + searchRef.current?.value);
  };
  return (
    <nav className="side-bar">
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            className="updateInput"
            type="text"
            placeholder="Search..."
            ref={searchRef}
          />
          <button className="saveButton" type="submit">
            Go
          </button>
        </form>
      </div>
    </nav>
  );
};

export default TopBar;
