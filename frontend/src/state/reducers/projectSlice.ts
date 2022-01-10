import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProject = createAsyncThunk(
  "fetchProject",
  async (_id: string | undefined) => {
    const res = await axios.get("http://localhost:5000/api/project/" + _id);
    return res.data;
  }
);

interface valueProps {
  title: string | undefined;
  description: string | undefined;
}

export const creatProject = createAsyncThunk(
  "creatProject",
  async (value: valueProps) => {
    const object: any = {
      title: value.title,
      description: value.description,
      code: { html: "", css: "", js: "" },
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

export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (id: string | undefined) => {
    await axios.delete("http://localhost:5000/api/project/" + id);
  }
);
export interface projectProps {
  projs: {
    _id: string;
    title: string;
    description: string;
    code: { html: string; css: string; js: string };
    err: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const projectInitialState = {
  _id: "",
  title: "",
  description: "",
  code: { html: "", css: "", js: "" },
  err: "",
  createdAt: "",
  updatedAt: "",
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
    cleanState: (state, action) => {
      const { _id, title, description } = action.payload;
      Object.assign(state, { _id, title, description });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
    builder.addCase(saveProject.fulfilled, (state, action) => {
      console.log("hiiii", action.payload.updatedAt);
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
} = projectSlice.actions;

export default projectSlice.reducer;
