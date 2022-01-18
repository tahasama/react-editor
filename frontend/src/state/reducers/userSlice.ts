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

export const updateProfileUser = createAsyncThunk(
  "updateProfileUser",
  async ({ user, email, uid, username, _id }: any) => {
    const newId = _id;
    try {
      const res = await updateEmail(user, email);
      try {
        const res2 = await axios.put(
          "http://localhost:5000/api/user/" + newId,
          {
            email: email,
            username: username,
          }
        );
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
    const storageRef = ref(storage, uid + ".jpg");
    try {
      const res = await getDownloadURL(storageRef);
      return res;
    } catch (error: any) {
      return error;
    }
  }
);

export interface userProps {
  user: {
    _id: string;
    uid: string;
    email: string;
    password: string;
    confirmPassword: string;
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
  email: "",
  password: "",
  confirmPassword: "",
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
    // updateImage: (state, action) => {
    //   console.log("gtgtgtgtgtgt", action.payload);
    //   state.image = action.payload;
    // },
    saveUser: (state, action) => {
      // Object.assign(state, action.payload);
      state.email = action.payload?.email;
      // state.username = action.payload.username;
      state.uid = action.payload?.uid;
      state.user = action.payload;
    },
    newImage: (state, action) => {
      state.userimage = action.payload.userimage;
    },
    newImag2: (state, action) => {
      state.image = action.payload.image;
    },
    newUsernme: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
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
    builder.addCase(updateProfileUser.fulfilled, (state, action: any) => {
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;
    });
    builder.addCase(downloadImage.fulfilled, (state, action: any) => {
      state.image = action.payload;
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
export const { updateError, saveUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
