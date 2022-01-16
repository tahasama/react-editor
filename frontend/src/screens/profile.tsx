import { getAuth } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
  uploadImage,
} from "../state/reducers/userSlice";
import "./profile.css";
import ProjectList from "./projectList";
import { auth, provider } from "../firebase";

const Profile = () => {
  const { email, uid, userimage, _id } = useAppSelector(getUserData);
  const { image, otherImage, useremail, usercreatedAt } =
    useAppSelector(getUserData);
  const dispatch = useDispatch();
  const { all, loading } = useAppSelector(getProjectsData);
  const projects = all.flat().reverse();
  const [allProjects, setallProjects] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const params = useParams();
  console.log("jujujuuju66666666666666", userimage);

  useEffect(() => {
    if (params.id !== "") {
      // dispatch(downloadOtherImage({ uid: params.id }));
      dispatch(fetchAllProject(params.id));

      dispatch(getUser(params.id));
    }
  }, [params.id, uid]);
  console.log("my otherimagebro 55555555", params.id);
  console.log("my userimage 555555555", uid);
  console.log("my userimage 555555555", _id);

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
                <p className="editingImage" onClick={() => setEditImage(true)}>
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
            <h3>Email:{useremail}</h3>
            <p>Joined on:{new Date(usercreatedAt).toDateString()}</p>
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
