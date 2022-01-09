import { Link, useNavigate, useParams } from "react-router-dom";
import "./sideBar.css";
import { useDispatch } from "react-redux";
import { fetchAllProject, searchProject, updateLoading } from "../state";
import { useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const TopBar = () => {
  const { title } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<any>(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log("search", searchRef.current.value);
    if (searchRef.current.value !== "") {
      dispatch(searchProject(searchRef.current?.value));
      navigate("/search/q=" + searchRef.current?.value);
    }
  };
  return (
    <nav className="top-bar ">
      <Link className="thacoder" to="/">
        ThaCoder
      </Link>

      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            className="searchInput"
            type="text"
            placeholder="Search..."
            ref={searchRef}
          />
          <button className="searchButton" type="submit">
            <AiOutlineSearch className="searchIcon" />
          </button>
        </form>
      </div>
      <div className="user">
        <Link to={""} className="userlink signUp">
          Sign Up
        </Link>
        <Link to={""} className="userlink logIn">
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default TopBar;
