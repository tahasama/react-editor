import { error } from "console";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { type } from "os";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { storage } from "../firebase";
import { useAppSelector } from "../state/hooks";
import {
  downloadImage,
  getUserData,
  uploadImage,
} from "../state/reducers/userSlice";

const UplodImage = () => {
  const { email, uid } = useAppSelector(getUserData);
  const dispatch = useDispatch();
  const imageRef = useRef<any>(null);
  const { image } = useAppSelector(getUserData);

  useEffect(() => {
    console.log("uid", uid);
    if (uid !== "") {
      dispatch(downloadImage({ uid: uid }));
    }
  }, [uid]);

  const upload = async () => {
    dispatch(uploadImage({ uid: uid, image: imageRef.current.files[0] }));
  };

  return (
    <div className="App">
      <input type="file" ref={imageRef} />
      <button onClick={upload}>Upload</button>
      <div className="imageContainer">
        <img src={image} alt="" className="userImage" />
      </div>
    </div>
  );
};

export default UplodImage;
