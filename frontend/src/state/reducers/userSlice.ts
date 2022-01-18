import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GoogleAuthProvider, updateEmail } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from "../../firebase";

export const updateProfileUser = createAsyncThunk(
  "updateProfileUser",
  async ({ user, email, uid, username, _id }: any) => {
    const newId = _id;
    try {
      const res = await updateEmail(user, email);
      console.log("USER...", user);

      try {
        const res2 = await axios.put(
          "http://localhost:5000/api/user/" + newId,
          {
            email: email,
            username: username,
          }
        );
        return res2;
      } catch (error) {
        console.log(error);
      }
      return res;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async (uid: string | undefined) => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/" + uid);
      return res.data[0];
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
);

interface uploadProps {
  _id?: string;
  uid?: string;
  image?: any;
}

export const uploadImage = createAsyncThunk(
  "uploadImage",
  async ({ image, uid, _id }: uploadProps) => {
    const storageRef = ref(storage, uid + ".jpg");
    try {
      await uploadBytesResumable(storageRef, image);
      try {
        const res = await getDownloadURL(storageRef);
        await axios.put("http://localhost:5000/api/user/" + _id, {
          image: res,
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
);
export const downloadImage = createAsyncThunk(
  "downloadImage",
  async ({ uid }: uploadProps) => {
    // console.log("downloadImage TRIGGERED");

    const storageRef = ref(storage, uid + ".jpg");
    try {
      const res = await getDownloadURL(storageRef);
      console.log("downloadImage", res);
      return { image: res };
    } catch (error: any) {
      return error;
    }
  }
);

export interface userProps {
  user: {
    _id: string;
    uid: string;
    error: { code: string; message: string };
    image: string;
    otherImage?: string;
    useremail?: string;
    username?: string;
    userimage?: string;
    usercreatedAt: string;
    userupdatedAt: string;
    user: any;
  };
}

export const userInitialState = {
  _id: "",
  uid: "",
  error: { code: "", message: "" },
  image: "",
  otherImage: "",
  useremail: "",
  username: "",
  userimage: "",
  usercreatedAt: "",
  userupdatedAt: "",
  user: "",
};

export const userSlice = createSlice({
  name: "user-redux",
  initialState: userInitialState,
  reducers: {
    updateError: (state, action) => {
      state.error.message = action.payload;
    },
    newUserImage: (state, action) => {
      console.log("TRIGGERED userimage", action.payload.userimage);
      state.userimage = action.payload.userimage;
    },
    newImage: (state, action) => {
      console.log("TRIGGERED image", action.payload.image);
      state.image = action.payload.image;
    },
    // newImag2: (state, action) => {
    //   state.image = action.payload.image;
    // },
    newUsernme: (state, action) => {
      state.username = action.payload.username;
      state.useremail = action.payload.useremail;
    },
    resetUser: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfileUser.fulfilled, (state, action: any) => {
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });
    builder.addCase(downloadImage.fulfilled, (state, action: any) => {
      console.log("MY IMAGE...", action.payload.image);
      state.image = action.payload.image;
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });

    // builder.addCase(downloadOtherImage.fulfilled, (state, action: any) => {
    //   console.log("download image", action.payload);
    //   state.otherImage = action.payload;
    // });
    builder.addCase(getUser.fulfilled, (state, action: any) => {
      // MIGHT BREAK SOMETHING !!!

      state.useremail = action.payload.email;
      state.usercreatedAt = action.payload.createdAt;
      state._id = action.payload._id;
      state.userimage = action.payload.image;
      state.username = action.payload.username;
      state.user = action.payload.uid;
      // Object.assign(state, action.payload);
    });
  },
});

export const getUserData = (state: userProps) => state.user;
export const { updateError, resetUser, newUsernme, newImage, newUserImage } =
  userSlice.actions;
export default userSlice.reducer;
