import { Link, useNavigate, useParams } from "react-router-dom";
import "./sideBar.css";

import { useDispatch } from "react-redux";
import { fetchAllProject, searchProject, updateLoading } from "../state";
import { useEffect, useRef } from "react";

const TopBar = () => {
  const { title } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<any>(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (title !== undefined) {
      dispatch(searchProject(searchRef.current?.value));
      navigate("/search/q=" + searchRef.current?.value);
    }
  };
  return (
    <nav className="top-bar ">
      <Link className="thacoder" to="/home">
        ThaCoder
      </Link>{" "}
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
      <div className="user">
        <p>User</p>
      </div>
    </nav>
  );
};

export default TopBar;
