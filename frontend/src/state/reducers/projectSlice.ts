import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProject = createAsyncThunk(
  "fetchProject",
  async (_id: string | undefined) => {
    const res = await axios.get("http://localhost:5000/api/project/" + _id);
    return res.data;
  }
);

interface valueProps {
  name: string | undefined;
  description: string | undefined;
}

export const creatProject = createAsyncThunk(
  "creatProject",
  async (value: valueProps) => {
    const object: any = {
      title: value.name,
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
    console.log("before", value);
    const object: any = {
      _id: value._id,
      title: value.title,
      description: value.description,
      code: { html: value.code.html, css: value.code.css, js: value.code.js },
    };
    const res = await axios.put(
      "http://localhost:5000/api/project/" + object._id,
      object
    );
    console.log("after", res.data);
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

export const projectSlice = createSlice({
  name: "project-redux",
  initialState: {
    _id: "",
    title: "",
    description: "",
    code: { html: "", css: "", js: "" },
    err: "",
    createdAt: "",
    updatedAt: "",
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
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateDate: (state, action) => {
      state.updatedAt = action.payload;
    },
    cleanState: (state) => {
      state._id = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.title = action.payload.title;
      state.code = action.payload.code;
      state.description = action.payload.description;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    });
    builder.addCase(creatProject.fulfilled, (state, action) => {
      state._id = action.payload._id;
      state.err = action.payload.message;
    });
    builder.addCase(saveProject.fulfilled, (state, action) => {
      state.code.html = action.payload.code.html;
      state.code.css = action.payload.code.css;
      state.code.js = action.payload.code.js;
      state.updatedAt = action.payload.updatedAt;
      state.description = action.payload.description;
      state.title = action.payload.title;
      state._id = action.payload._id;
    });
  },
});

// Action creators are generated for each case reducer function
export const getProjectData = (state: projectProps) => state.projs;

export const {
  updateHtml,
  updateCss,
  updateJs,
  updateTitle,
  updateDescription,
  cleanState,
  updateDate,
} = projectSlice.actions;

export default projectSlice.reducer;
