import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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
  async ({ email, password, provider }: valueProps) => {
    if (provider) {
      try {
        const res = await signInWithPopup(auth, provider);
        console.log("result of google auth: ", res.user.uid);
        return res.user;
      } catch (error: any) {
        return error;
      }
    } else {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log("result of google auth: ", res.user.uid);

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
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
);

interface uploadProps {
  uid?: string;
  image?: any;
}

export const uploadImage = createAsyncThunk(
  "uploadImage",
  async ({ image, uid }: uploadProps) => {
    const storageRef = ref(storage, uid + ".jpg");

    console.log("image", image, "storageRef ===>", storageRef);
    try {
      await uploadBytesResumable(storageRef, image);
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
);
export const downloadImage = createAsyncThunk(
  "downloadImage",
  async ({ uid }: uploadProps) => {
    console.log("uid reducer", uid);
    const storageRef = ref(storage, uid + ".jpg");
    try {
      console.log("image reducer", ref(storage, uid + ".jpg"));
      const res = await getDownloadURL(storageRef);
      console.log("image reducer222", storageRef);
      return res;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
);

export interface userProps {
  user: {
    uid: string;
    email: string;
    password: string;
    confirmPassword: string;
    error: { code: string; message: string };
    image: string;
  };
}

export const userInitialState = {
  uid: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: { code: "", message: "" },
  image: "",
};

export const userSlice = createSlice({
  name: "user-redux",
  initialState: userInitialState,
  reducers: {
    updateError: (state, action) => {
      state.error.message = action.payload;
    },
    // updateImage: (state, action) => {
    //   console.log("gtgtgtgtgtgt", action.payload);
    //   state.image = action.payload;
    // },
    saveUser: (state, action) => {
      // Object.assign(state, action.payload);
      state.email = action.payload?.email;
      state.uid = action.payload?.uid;
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
      console.log("fron redu", state.uid);
      state.email = action.payload.email;
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });
    builder.addCase(downloadImage.fulfilled, (state, action: any) => {
      console.log("download image", action.payload);
      state.image = action.payload;
    });
  },
});

export const getUserData = (state: userProps) => state.user;
export const { updateError, saveUser } = userSlice.actions;
export default userSlice.reducer;
