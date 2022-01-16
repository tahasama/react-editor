import { getAuth } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Project from "../components/project";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import UploadImage from "../components/uploadImage";
import { fetchAllProject, getProjectsData } from "../state";
import { useAppSelector } from "../state/hooks";
import {
  downloadImage,
  // downloadOtherImage,
  getUser,
  getUserData,
  updateProfileUser,
  uploadImage,
} from "../state/reducers/userSlice";
import "./profile.css";
import ProjectList from "./projectList";
import { auth, provider } from "../firebase";

const Profile = () => {
  const { email, uid, userimage, _id, user, username } =
    useAppSelector(getUserData);
  const { image, otherImage, useremail, usercreatedAt } =
    useAppSelector(getUserData);
  const dispatch = useDispatch();
  const { all, loading } = useAppSelector(getProjectsData);
  const projects = all.flat().reverse();
  const [allProjects, setallProjects] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [cancel, setCancel] = useState(false);
  const emailRef = useRef<any>(null);
  const usernameRef = useRef<any>(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id !== "") {
      // dispatch(downloadOtherImage({ uid: params.id }));
      dispatch(fetchAllProject(params.id));

      dispatch(getUser(params.id));
    }
  }, [params.id, uid]);
  console.log("my otherimagebro 55555555", params.id);
  console.log("my userimage 555555555", uid);
  console.log("my userimage 555555555", emailRef.current);

  const updateProfile = () => {
    if (emailRef.current && auth.currentUser) {
      dispatch(
        updateProfileUser({
          user: user,
          email: emailRef.current.value,
          uid: uid,
          username: usernameRef.current.value,
        })
      );
      setTimeout(() => {
        setCancel(false);
      }, 1000);
    }
  };

  return (
    <div className="App">
      <SideBar />
      <TopBar />
      <div className="profileContainer">
        <div className="user">
          {" "}
          <div>
            <div className="imageProfileContainer">
              <img src={userimage} alt="" className="userProfileImage" />
            </div>{" "}
            <div className="uploadImage">
              {editImage ? (
                <>
                  <UploadImage />{" "}
                  <button
                    className="cancel"
                    onClick={() => setEditImage(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                uid === params.id && (
                  <p
                    className="editingImage"
                    onClick={() => setEditImage(true)}
                  >
                    <span className="editImage">
                      <AiFillEdit />
                    </span>
                    <span className="editText">Edit image ?</span>
                  </p>
                )
              )}
            </div>
          </div>
          <div className="userInfo">
            {!cancel ? (
              <>
                <p className="labelValues">Email:{useremail}</p>
              </>
            ) : (
              cancel && (
                <div className="labelInput forUpdate">
                  <p className="labelUpate"> Email:</p>
                  <input
                    defaultValue={email}
                    type="email"
                    name="email"
                    className="formInput email"
                    ref={emailRef}
                  />
                </div>
              )
            )}{" "}
            {!cancel ? (
              <>
                <p className="labelValues">Username:{username}</p>
              </>
            ) : (
              <div className="labelInput forUpdate">
                <p className="labelUpate">Username:</p>
                <input
                  defaultValue={username}
                  type="email"
                  name="email"
                  className="formInput email"
                  ref={usernameRef}
                />
              </div>
            )}
            <p className="profileLabels">
              Joined on:{new Date(usercreatedAt).toDateString()}
            </p>
            <p className="profileLabels">projects:</p>
            <p className="profileLabels">stars</p>{" "}
            {!cancel ? (
              <>
                <p
                  className="editingProfile"
                  onClick={() => setEditProfile(true)}
                >
                  <span className="editImage">
                    <AiFillEdit />
                  </span>
                  <span className="editText" onClick={() => setCancel(true)}>
                    Edit profile ?
                  </span>
                </p>
              </>
            ) : (
              <>
                <button
                  disabled={loading}
                  type="submit"
                  className="loginButton"
                  onClick={() => setCancel(false)}
                >
                  Cancel
                </button>
                <button
                  style={{ background: "purple" }}
                  disabled={loading}
                  type="submit"
                  className="loginButton"
                  onClick={updateProfile}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>

        <div className="projects">
          <div>
            {!loading ? (
              <>
                <div className="lisContainer">
                  <div className="profileProjectsList">
                    {(!allProjects ? projects.slice(0, 2) : projects).map(
                      (proj: any) => (
                        <div key={proj._id}>
                          <Link
                            to={"/editor/" + proj._id}
                            className="projectLink"
                          >
                            <div className="profileProjects">
                              <Project proj={proj} />
                            </div>
                          </Link>
                        </div>
                      )
                    )}
                  </div>
                </div>
                {!allProjects && projects.length > 2 && (
                  <button
                    onClick={() => setallProjects(true)}
                    className="seeAllProjects"
                  >
                    see all projects ?
                  </button>
                )}
              </>
            ) : (
              <span className="loader"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
