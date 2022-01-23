import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import { getAuthData } from "../state/reducers/authSlice";
import { cancelState } from "../state/reducers/cancelSlice";
import {
  getUserData,
  newImage,
  newUserImage,
  uploadImage,
} from "../state/reducers/userSlice";

const UploadImage = () => {
  const { _id } = useAppSelector(getUserData);
  const { uid } = useAppSelector(getAuthData);

  const dispatch = useDispatch();
  const imageRef = useRef<any>(null);
  const [error, setError] = useState(false);

  const upload = async (e: any) => {
    e.preventDefault();
    if (imageRef.current.files[0] !== undefined) {
      dispatch(
        uploadImage({ uid: uid, image: imageRef.current.files[0], _id: _id })
      );
      const imgUrl = URL.createObjectURL(imageRef.current.files[0]);

      // dispatch(
      //   newUserImage({
      //     userimage: imgUrl,
      //   })
      // );
      dispatch(
        newImage({
          image: imgUrl,
        })
      );

      dispatch(cancelState({ cancelImage: false }));
    } else {
      setError(true);
      dispatch(cancelState({ cancelImage: true }));
    }
  };
  return (
    <div>
      <label htmlFor="file-upload" className="imageUpload">
        Browse Image
      </label>
      <input id="file-upload" ref={imageRef} type="file" />

      <button onClick={upload} className="imageUpload upload xx">
        <span className="uploadText">Upload</span>
      </button>
      <button
        className="imageUpload upload xy"
        onClick={() => dispatch(cancelState({ cancelImage: false }))}
      >
        <span className="uploadText"> Cancel</span>
      </button>
      {error && (
        <p className="errorMessage">please add an image before uploading!</p>
      )}
    </div>
  );
};

export default UploadImage;
