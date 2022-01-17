import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import { cancelState } from "../state/reducers/cancelSlice";
import { getUserData, uploadImage } from "../state/reducers/userSlice";

const UploadImage = () => {
  const { email, uid, _id, userimage } = useAppSelector(getUserData);

  const dispatch = useDispatch();
  const imageRef = useRef<any>(null);
  const [error, setError] = useState(false);

  const upload = async (e: any) => {
    e.preventDefault();
    if (imageRef.current.files[0] !== undefined) {
      dispatch(
        uploadImage({ uid: uid, image: imageRef.current.files[0], _id: _id })
      );
      // dispatch(newImage(userimage));
      dispatch(cancelState({ cancelImage: true }));
    } else {
      setError(true);
      console.log("/error", error);
    }
  };
  return (
    <div>
      <input type="file" ref={imageRef} />
      <button onClick={upload}>Upload</button>
      {error && (
        <p className="errorMessage">please add an image before uploading!</p>
      )}
    </div>
  );
};

export default UploadImage;
