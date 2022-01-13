import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

interface valueProps {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ email, password }: valueProps) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (error: any) {
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: valueProps) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
);

export interface userProps {
  user: {
    email: string;
    password: string;
    confirmPassword: string;
    error: { code: string; message: string };
    token: string;
  };
}

export const userInitialState = {
  email: "",
  password: "",
  confirmPassword: "",
  error: { code: "", message: "" },
  token: "",
};

export const userSlice = createSlice({
  name: "user-redux",
  initialState: userInitialState,
  reducers: {
    updateError: (state, action) => {
      state.error.message = action.payload;
    },
    saveUser: (state, action) => {
      state.email = action.payload?.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action: any) => {
      console.log("full action", action.payload);
      state.email = action.payload.email;
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });

    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      state.email = action.payload.email;
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });
  },
});

export const getUserData = (state: userProps) => state.user;
export const { updateError, saveUser } = userSlice.actions;
export default userSlice.reducer;
