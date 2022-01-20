import { Link, useNavigate, useParams } from "react-router-dom";
import "./navBar.css";
import { useDispatch } from "react-redux";
import {
  getProjectData,
  searchProject,
  updateLoading,
  updateSaved,
} from "../state";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch, AiOutlineBars } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useAppSelector } from "../state/hooks";
import { downloadImage, getUserData } from "../state/reducers/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { getAuthData } from "../state/reducers/authSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<any>(null);
  const { saved } = useAppSelector(getProjectData);
  const { image } = useAppSelector(getUserData);
  const { uid, error } = useAppSelector(getAuthData);

  const [profile, setprofile] = useState(false);

  useEffect(() => {
    if (uid && error.code !== "storage/object-not-found") {
      dispatch(downloadImage({ uid: uid }));
    }
  }, [error, uid]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (searchRef.current.value !== "") {
      dispatch(updateLoading(true));
      setTimeout(() => {
        dispatch(searchProject(searchRef.current?.value));
        navigate("/search/q=" + searchRef.current?.value);
      }, 100);
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
        {!uid ? (
          <>
            <button
              className="userlink signUp"
              onClick={() => alerted("/register")}
            >
              Sign Up
            </button>
            <button
              className="userlink logIn"
              onClick={() => alerted("/login")}
            >
              Log In
            </button>
          </>
        ) : (
          <>
            {" "}
            <div className="imageContainerbar" onClick={onProfile}>
              {image ? (
                <img src={image} alt="" className="userImageBar" />
              ) : (
                <>
                  <BiUserCircle className="userIconBar" />
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
