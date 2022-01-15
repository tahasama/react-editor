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

  console.log("uyuyuyuyu", image);

  useEffect(() => {
    console.log("uid", uid);
    if (uid !== "") {
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
    console.log("inside alert");

    if (!saved) {
      const result = window.confirm("are you sure you want to leave? ");
      if (result) {
        navigate(destination);
      }
    } else {
      console.log("navigating");
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
                <FaUserAlt className="userIconBar" />
              )}
              <span className="threeBars">
                <AiOutlineBars />
              </span>
            </div>
            {profile && (
              <div className="profileWrapper">
                <button
                  className="barbar"
                  onClick={() => (
                    console.log("its loggedout"),
                    alerted("/profile"),
                    console.log("its alerted")
                  )}
                >
                  Profile
                </button>
                <button
                  className="barbar"
                  onClick={() => (
                    signOut(auth),
                    console.log("its loggedout"),
                    alerted("/"),
                    console.log("its alerted")
                  )}
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
