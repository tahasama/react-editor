import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import { auth, storage } from "../../firebase";

interface valueProps {
  email: string;
  password: string;
  provider?: GoogleAuthProvider;
  useremail?: string;
  username?: string;
  userimage?: string;
}

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ email, password }: valueProps) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const object = {
        email: res.user.email,
        uid: res.user.uid,
        name: "",
        image: "",
      };
      await axios.post("http://localhost:5000/api/user/", object);

      return res.user;
    } catch (error: any) {
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password, provider }: valueProps) => {
    if (provider) {
      try {
        const res = await signInWithPopup(auth, provider);
        try {
          await axios.post("http://localhost:5000/api/user/", {
            email: res.user.email,
            uid: res.user.uid,
          });
        } catch (error) {}
        return res.user;
      } catch (error: any) {
        return error;
      }
    } else {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res.user;
      } catch (error: any) {
        return error;
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "loginUser",
  async (email: string) => {
    try {
      const res = await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
);

export interface userProps {
  authUser: {
    uid: string;
    email: string;
    password: string;
    confirmPassword: string;
    error: { code: string; message: string };
    user: any;
  };
}

export const userInitialState = {
  uid: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: { code: "", message: "" },
  user: "",
};

export const authSlice = createSlice({
  name: "user-redux",
  initialState: userInitialState,
  reducers: {
    updateError: (state, action) => {
      state.error.message = action.payload;
    },
    saveUser: (state, action) => {
      // Object.assign(state, action.payload);
      state.email = action.payload?.email;
      // state.username = action.payload.username;
      state.uid = action.payload?.uid;
      state.user = action.payload;
    },
    resetUser: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action: any) => {
      state.email = action.payload.email;
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });

    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });
  },
});

export const getAuthData = (state: userProps) => state.authUser;
export const { updateError, saveUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
