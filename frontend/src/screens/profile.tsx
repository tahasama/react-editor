import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Project from "../components/project";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import UploadImage from "../components/uploadImage";
import { getProjectsData } from "../state";
import { useAppSelector } from "../state/hooks";
import {
  downloadImage,
  getUserData,
  uploadImage,
} from "../state/reducers/userSlice";
import "./profile.css";
import ProjectList from "./projectList";

const Profile = () => {
  const { uid } = useAppSelector(getUserData);
  const { image } = useAppSelector(getUserData);
  const dispatch = useDispatch();
  const { all, loading } = useAppSelector(getProjectsData);
  const projects = all.flat().reverse();
  const [allProjects, setallProjects] = useState(false);
  const [editImage, setEditImage] = useState(false);

  console.log("myprojects", projects.slice(0));
  const condition = allProjects ? 0 : 2;

  useEffect(() => {
    console.log("uid", uid);
    if (uid !== "") {
      dispatch(downloadImage({ uid: uid }));
    }
  }, [uid]);

  return (
    <div className="App">
      <SideBar />
      <TopBar />
      <div className="profileContainer">
        <div className="user">
          <div>
            <div className="imageProfileContainer">
              <img src={image} alt="" className="userProfileImage" />
            </div>{" "}
            <div className="uploadImage">
              {editImage ? (
                <>
                  <UploadImage />
                </>
              ) : (
                <p className="editingImage">
                  <span className="editImage">
                    <AiFillEdit />
                  </span>
                  <p className="editText">Edit image ?</p>
                </p>
              )}
            </div>
          </div>
          <div className="userInfo">
            <h2>Display name:</h2>
            <h3>Email:</h3>
            <p>Joined on:</p>
            <p>last visit:</p>
            <p>projects:</p>
            <p>stars</p>
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
                {!allProjects && (
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
