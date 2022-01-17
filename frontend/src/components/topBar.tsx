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
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch, AiOutlineBars } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

import { FaUserAlt } from "react-icons/fa";

// import { IoMdArrowDropdown } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { downloadImage, getUserData } from "../state/reducers/userSlice";
import { signOut } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref } from "firebase/storage";

const TopBar = () => {
  const { title } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<any>(null);
  const { saved } = useAppSelector(getProjectData);
  const { email, uid, image } = useAppSelector(getUserData);
  const [profile, setprofile] = useState(false);

  useEffect(() => {
    if (uid) {
      dispatch(downloadImage({ uid: uid }));
    }
  }, [uid]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (searchRef.current.value !== "") {
      dispatch(searchProject(searchRef.current?.value));
      navigate("/search/q=" + searchRef.current?.value);
    }
  };

  const onProfile = () => {
    setprofile(!profile);
  };

  const alerted = (destination: string) => {
    if (!saved) {
      const result = window.confirm("are you sure you want to leave? ");
      if (result) {
        dispatch(updateSaved(true));
        navigate(destination);
      }
    } else {
      navigate(destination);
    }
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

        {uid && (
          <>
            {" "}
            <div className="imageContainerbar" onClick={onProfile}>
              {!image.toString().startsWith("FirebaseError") ? (
                <img src={image} alt="" className="userImageBar" />
              ) : (
                <>
                  <BiUserCircle className="userIconBar" />
                  {/* <FaUserAlt className="userIconBar" /> */}
                </>
              )}
              <span className="threeBars">
                <AiOutlineBars />
              </span>
            </div>
            {profile && (
              <div className="profileWrapper">
                <button
                  className="barbar"
                  onClick={() => alerted("/profile/" + uid)}
                >
                  Profile
                </button>
                <button
                  className="barbar"
                  onClick={() => (signOut(auth), alerted("/"))}
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
