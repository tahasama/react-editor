import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Project from "../components/project";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import UploadImage from "../components/uploadImage";
import { fetchAllProject, getProjectsData, updateLoading } from "../state";
import { useAppSelector } from "../state/hooks";
import {
  getUser,
  getUserData,
  newUsernme,
  updateError,
  updateProfileUser,
} from "../state/reducers/userSlice";
import "./profile.css";
import { auth } from "../firebase";

import { FiUser } from "react-icons/fi";
import { cancelState } from "../state/reducers/cancelSlice";
import { getAuthData } from "../state/reducers/authSlice";

const Profile = () => {
  const { userimage, _id, username, useremail, usercreatedAt, error } =
    useAppSelector(getUserData);
  const { email, uid, user } = useAppSelector(getAuthData);
  const dispatch = useDispatch();
  const { all, loading } = useAppSelector(getProjectsData);
  const projects = all.flat().reverse();
  const nbProjects = projects.length;
  const [allProjects, setallProjects] = useState(false);

  const { cancelImage, cancelInfo } = useAppSelector((state) => state.cancel);
  const emailRef = useRef<any>(null);
  const usernameRef = useRef<any>(null);

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (error.code === "auth/requires-recent-login") {
      dispatch(updateError("please re-LogIn to update your email."));
    } else if (error.code === "storage/object-not-found") {
      dispatch(updateError(""));
    }
  }, [error]);

  useEffect(() => {
    if (!projects) {
      dispatch(updateLoading(true));
    }
    dispatch(fetchAllProject(params.id));
  }, [params.id, projects]);

  useEffect(() => {
    dispatch(getUser(params.id));
  }, [params.id]);

  const updateProfile = () => {
    if (emailRef.current && auth.currentUser) {
      dispatch(
        updateProfileUser({
          user: user,
          email: emailRef.current.value,
          uid: uid,
          _id: _id,
          username: usernameRef.current.value,
        })
      );
      dispatch(
        newUsernme({
          username: usernameRef.current.value,
          useremail: emailRef.current.value,
        })
      );
      {
        dispatch(cancelState({ cancelProfile: true }));
      }
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
              {userimage ? (
                <img src={userimage} alt="" className="userProfileImage" />
              ) : (
                <div className="noUserImage">
                  <FiUser />
                </div>
              )}
            </div>{" "}
            <div className="uploadImage">
              {cancelImage ? (
                <>
                  <UploadImage />{" "}
                </>
              ) : (
                uid === params.id && (
                  <p
                    className="editingImage"
                    style={{
                      fontFamily: "initial",
                      fontSize: 18,
                    }}
                    onClick={() => dispatch(cancelState({ cancelImage: true }))}
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
            {!cancelInfo ? (
              <>
                <h3
                  className="labelValues"
                  style={{ marginTop: 28, marginBottom: 22 }}
                >
                  Email : {useremail}
                </h3>
              </>
            ) : (
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
            )}{" "}
            {!cancelInfo ? (
              <>
                <h4
                  className="labelValues"
                  style={{ marginTop: 22, marginBottom: 22 }}
                >
                  Username: {username}
                </h4>
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
              Joined on : {new Date(usercreatedAt).toDateString().slice(4, 16)}
            </p>
            <p className="profileLabels">projects : {nbProjects}</p>
            <p className="profileLabels">stars : </p>{" "}
            {!cancelInfo ? (
              uid === params.id && (
                <>
                  <p
                    className="editingProfile"
                    style={{
                      fontFamily: "initial",
                      marginTop: 28,
                      fontSize: 18,
                    }}
                  >
                    <span className="editImage">
                      <AiFillEdit />
                    </span>
                    <span
                      className="editText"
                      onClick={() =>
                        dispatch(cancelState({ cancelInfo: true }))
                      }
                    >
                      Edit profile ?
                    </span>
                  </p>
                </>
              )
            ) : (
              <>
                {" "}
                {error && (
                  <p className="errorMessage" style={{ width: 500, margin: 0 }}>
                    {error.message}
                  </p>
                )}
                <button
                  disabled={loading}
                  type="submit"
                  className="loginButton"
                  onClick={() => dispatch(cancelState({ cancelInfo: false }))}
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
                </button>{" "}
              </>
            )}{" "}
          </div>
        </div>

        <div className="projects">
          <div>
            {!loading ? (
              <>
                <div className="profileProjectsList">
                  {(!allProjects ? projects.slice(0, 2) : projects).map(
                    (proj: any) => (
                      <div key={proj._id}>
                        <button
                          onClick={() => navigate("/editor/" + proj._id)}
                          className="projectLink but"
                        >
                          <div className="profileProjects">
                            <Project proj={proj} />
                          </div>
                        </button>
                      </div>
                    )
                  )}
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
