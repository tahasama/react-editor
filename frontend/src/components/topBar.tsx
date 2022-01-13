import { Link, useNavigate, useParams } from "react-router-dom";
import "./navBar.css";
import { useDispatch } from "react-redux";
import {
  fetchAllProject,
  getProjectData,
  searchProject,
  updateLoading,
  updateSaved,
} from "../state";
import { useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getUserData } from "../state/reducers/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const TopBar = () => {
  const { title } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<any>(null);
  const { saved } = useAppSelector(getProjectData);
  const { email } = useAppSelector(getUserData);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (searchRef.current.value !== "") {
      dispatch(searchProject(searchRef.current?.value));
      navigate("/search/q=" + searchRef.current?.value);
    }
  };

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
    <nav className="topBar ">
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
        {!email && (
          <button
            className="userlink signUp"
            onClick={() => alerted("/register")}
          >
            Sign Up
          </button>
        )}
        {!email && (
          <button className="userlink logIn" onClick={() => alerted("/login")}>
            Log In
          </button>
        )}

        {email && (
          <button
            className="userlink logIn"
            onClick={() => (signOut(auth), alerted("/"))}
          >
            LogOut
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
