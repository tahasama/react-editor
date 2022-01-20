import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProject = createAsyncThunk(
  "fetchProject",
  async (_id: string | undefined) => {
    const res = await axios.get("http://localhost:5000/api/project/" + _id);
    return res.data;
  }
);

export interface valueProps {
  uid: string;
  email: string;
  title: string;
  description: string;
  username?: string;
  star?: string[];
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
      star: 0,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/project/",
        object
      );
      return res.data;
    } catch (error) {
      console.log("creratng error....", error);
    }
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
interface starProps {
  _id: string | undefined;
  star: string[];
}
export const StarProject = createAsyncThunk(
  "saveProject",
  async (value: starProps) => {
    const object = {
      _id: value._id,
      star: value.star,
    };
    try {
      const res = await axios.put(
        "http://localhost:5000/api/project/star/" + object._id,
        value
      );
      return res.data;
    } catch (error) {
      console.log("NO UPDATE", error);
    }
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
    star: string[];
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
  star: [],
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
    updateStar: (state, action) => {
      console.log("MY STARS", action.payload.star);
      state.star = action.payload.star;
      // state.star.push(action.payload);
    },

    cleanState: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.user = action.payload.uid;
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
  updateStar,
} = projectSlice.actions;

export default projectSlice.reducer;
