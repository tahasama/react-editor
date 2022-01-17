import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userSlice from "./userSlice";

export const fetchProject = createAsyncThunk(
  "fetchProject",
  async (_id: string | undefined) => {
    const res = await axios.get("http://localhost:5000/api/project/" + _id);
    return res.data;
  }
);

interface valueProps {
  uid: string; //| undefined;
  email: string;
  title: string; //| undefined;
  description: string; //| undefined;
  username?: string;
}

export const creatProject = createAsyncThunk(
  "creatProject",
  async (value: valueProps) => {
    const object: any = {
      uid: value.uid,
      email: value.email,
      username: value.username,
      title: value.title,
      description: value.description,
      code: { html: "", css: "", js: "" },
    };
    const res = await axios.post("http://localhost:5000/api/project/", object);

    return res.data;
  }
);
interface cloneProps {
  uid: string;
  user: string; //| undefined;
  title: string | undefined;
  description: string | undefined;
  code: { html: string; css: string; js: string };
}

export const cloneProject = createAsyncThunk(
  "cloneProject",
  async (val: cloneProps) => {
    const object: any = {
      uid: val.uid,
      email: val.user,
      title: val.title + " clone",
      description: val.description,
      code: { html: val.code.html, css: val.code.css, js: val.code.js },
    };
    console.log("DDDDDDDDDDDDDD", object);
    const res = await axios.post("http://localhost:5000/api/project/", object);
    return res.data;
  }
);

interface saveProps {
  _id: string | undefined;
  title: string;
  description: string;
  code: { html: string; css: string; js: string };
}

export const saveProject = createAsyncThunk(
  "saveProject",
  async (value: saveProps) => {
    const object = {
      _id: value._id,
    };
    const res = await axios.put(
      "http://localhost:5000/api/project/" + object._id,
      value
    );
    return res.data;
  }
);

export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (id: string | undefined) => {
    await axios.delete("http://localhost:5000/api/project/" + id);
  }
);
export interface projectProps {
  projs: {
    _id: string;
    user: string;
    title: string;
    description: string;
    code: { html: string; css: string; js: string };
    err: string;
    createdAt: string;
    updatedAt: string;
    saved: boolean;
  };
}

export const projectInitialState = {
  _id: "",
  user: "",
  title: "",
  description: "",
  code: { html: "", css: "", js: "" },
  err: "",
  createdAt: "",
  updatedAt: "",
  saved: true,
};

export const projectSlice = createSlice({
  name: "project-redux",
  initialState: projectInitialState,
  reducers: {
    updateCode: (state, action) => {
      Object.assign(state.code, action.payload.code);
    },
    updateProjectInfos: (state, action) => {
      Object.assign(state, action.payload);
    },
    updateDate: (state, action) => {
      state.updatedAt = action.payload;
    },
    updateId: (state, action) => {
      state._id = action.payload._id;
    },
    updateSaved: (state, action) => {
      state.saved = action.payload;
    },

    cleanState: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      console.log("fetching project data..", action.payload);
      Object.assign(state, action.payload);
      // state.title = action.payload.title;
      state.user = action.payload.uid;
      console.log("user...", state.user);
    });
    builder.addCase(saveProject.fulfilled, (state, action) => {
      state.updatedAt = action.payload.updatedAt;
    });

    builder.addCase(creatProject.fulfilled, (state, action) => {
      state._id = action.payload._id;
    });
  },
});

// Action creators are generated for each case reducer function
export const getProjectData = (state: projectProps) => state.projs;

export const {
  updateCode,
  updateProjectInfos,
  cleanState,
  updateDate,
  updateId,
  updateSaved,
} = projectSlice.actions;

export default projectSlice.reducer;
