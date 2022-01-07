import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProject = createAsyncThunk(
  "fetchProject",
  async (id: string | undefined) => {
    const res = await axios.get("http://localhost:5000/api/project/" + id);

    return res.data;
  }
);

export const creatProject = createAsyncThunk(
  "creatProject",
  async (value: string | undefined) => {
    const object: any = { title: value, code: { html: "", css: "", js: "" } };
    const res = await axios.post("http://localhost:5000/api/project/", object);
    console.log(res.data.message);
    return res.data;
  }
);

interface titleProps {
  newData: {
    id: string | undefined;
    title: string;
    code: { html: string; css: string; js: string };
  };
}

export const saveProject = createAsyncThunk(
  "saveProject",
  async ({ newData }: titleProps) => {
    const res = await axios.put(
      "http://localhost:5000/api/project/" + newData.id,
      newData
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
    code: { html: string; css: string; js: string };
    err: string;
  };
}

export const projectSlice = createSlice({
  name: "project-redux",
  initialState: {
    _id: "",
    title: "",
    code: { html: "", css: "", js: "" },
    err: "",
  },
  reducers: {
    updateHtml: (state, action) => {
      state.code.html = action.payload;
    },
    updateCss: (state, action) => {
      state.code.css = action.payload;
    },
    updateJs: (state, action) => {
      state.code.js = action.payload;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    cleanState: (state) => {
      state._id = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.title = action.payload.title;
      state.code = action.payload.code;
    });
    builder.addCase(creatProject.fulfilled, (state, action) => {
      state._id = action.payload._id;
      state.err = action.payload.message;
    });
    builder.addCase(saveProject.fulfilled, (state, action) => {
      state.code.html = action.payload.code.html;
      state.code.css = action.payload.code.css;
      state.code.js = action.payload.code.js;
    });
  },
});

// Action creators are generated for each case reducer function
export const getProjectData = (state: projectProps) => state.projs;

export const { updateHtml, updateCss, updateJs, updateTitle, cleanState } =
  projectSlice.actions;

export default projectSlice.reducer;
