import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import { getUserData, uploadImage } from "../state/reducers/userSlice";

const UploadImage = () => {
  const { email, uid, _id } = useAppSelector(getUserData);

  const dispatch = useDispatch();
  const imageRef = useRef<any>(null);

  const upload = async () => {
    dispatch(
      uploadImage({ uid: uid, image: imageRef.current.files[0], _id: _id })
    );
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  };
  return (
    <div>
      <input type="file" ref={imageRef} />
      <button onClick={upload}>Upload</button>
    </div>
  );
};

export default UploadImage;
