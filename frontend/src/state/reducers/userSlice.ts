import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { updateEmail } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const USER_URL: any = process.env.REACT_APP_USER_URL;

export const updateProfileUser = createAsyncThunk(
  "updateProfileUser",
  async ({ user, email, uid, username, _id }: any) => {
    const newId = _id;
    try {
      const res = await updateEmail(user, email);

      try {
        const res2 = await axios.put(USER_URL + newId, {
          email: email,
          username: username,
        });
        return res2;
      } catch (error) {}
      return res;
    } catch (error: any) {
      return error;
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async (uid: string | undefined) => {
    try {
      const res = await axios.get(USER_URL + uid);
      return res.data[0];
    } catch (error: any) {
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
        await axios.put(USER_URL + _id, {
          image: res,
        });
      } catch (error) {}
    } catch (error: any) {
      return error;
    }
  }
);
export const downloadImage = createAsyncThunk(
  "downloadImage",
  async ({ uid }: uploadProps) => {
    const storageRef = ref(storage, uid + ".jpg");
    try {
      const res = await getDownloadURL(storageRef);
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
    clearImage: (state, action) => {
      console.log("deal with image....", action.payload.image);
      state.image = action.payload.image;
      state.userimage = action.payload.image;
    },
    newUserImage: (state, action) => {
      // state.userimage = action.payload.userimage;
      Object.assign(state, action.payload);
    },
    newImage: (state, action) => {
      // state.image = action.payload.image;
      Object.assign(state, action.payload);
    },
    // newUsernme: (state, action) => {
    //   console.log("new username reducer...", action.payload.username);
    //   state.username = action.payload.username;
    //   // state.useremail = action.payload.useremail;
    //   // Object.assign(state, action.payload);
    //   // const { username } = action.payload;
    //   // Object.assign(state, { username });

    //   console.log("new username State reducer...", state.username);
    // },
    resetUser: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfileUser.fulfilled, (state, action: any) => {
      Object.assign(state, action.payload);
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });
    builder.addCase(downloadImage.fulfilled, (state, action: any) => {
      Object.assign(state, action.payload);

      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });

    builder.addCase(getUser.fulfilled, (state, action: any) => {
      console.log("this user pfrofile...", action.payload);
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
export const { updateError, resetUser, newImage, newUserImage, clearImage } =
  userSlice.actions;
export default userSlice.reducer;
