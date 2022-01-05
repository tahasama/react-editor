import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProject = createAsyncThunk(
  "fetchProject",
  async (id: string | undefined) => {
    const res = await axios.get("http://localhost:5000/api/project/" + id);
    return res.data.title;
  }
);

export const creatProject = createAsyncThunk(
  "creatProject",
  async (value: string | undefined) => {
    const object: any = { title: value, code: { html: "", css: "", js: "" } };
    const res = await axios.post("http://localhost:5000/api/project/", object);
    return res.data._id;
  }
);

interface projectProps {
  projs: {
    _id: string;
    title: string;
    code: { html: string; css: string; js: string };
  };
}

export const projectSlice = createSlice({
  name: "project-redux",
  initialState: {
    _id: "",
    title: "",
    code: { html: "", css: "", js: "" },
  },
  reducers: {
    // updateCell: (state, action) => {
    //   switch (action.payload.myType) {
    //     case "html":
    //       state.code.html = action.payload.myCode;
    //       break;
    //     case "css":
    //       state.code.css = action.payload.myCode;
    //       break;
    //     case "js":
    //       state.code.js = action.payload.myCode;
    //       break;
    //     default:
    //       return state;
    //   }
    // },
    updateHtml: (state, action) => {
      console.log(action.payload);
      state.code.html = action.payload;
    },
    updateCss: (state, action) => {
      state.code.css = action.payload;
    },
    updateJs: (state, action) => {
      state.code.js = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.title = action.payload;
    });
    builder.addCase(creatProject.fulfilled, (state, action) => {
      state._id = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const getMyProject = (state: projectProps) => state.projs.title;
export const createMyProject = (state: projectProps) => state.projs._id;

export const { updateHtml, updateCss, updateJs } = projectSlice.actions;

export default projectSlice.reducer;
