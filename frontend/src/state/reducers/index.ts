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
    return res.data._id;
  }
);

interface codeProps {
  newData: { code: { html: string; css: string; js: string } };
  id: string | undefined;
}

export const saveProject = createAsyncThunk(
  "saveProject",
  async ({ newData, id }: codeProps) => {
    console.log("her we are in the reducer");
    console.log("here is the id", id, "and here is the code", newData);

    const res = await axios.put(
      "http://localhost:5000/api/project/" + id,
      newData
    );
    console.log("saveProject saveProject saveProject", res.data);
    return res.data;
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
      state.title = action.payload.title;
      state.code = action.payload.code;
    });
    builder.addCase(creatProject.fulfilled, (state, action) => {
      state._id = action.payload;
    });
    builder.addCase(saveProject.fulfilled, (state, action) => {
      console.log("extraReducers saveProject state", state);
      console.log("extraReducers saveProject action", action);
      console.log("new payload", action.payload.code.html);
      console.log("new state", state.code.html);
      state.code.html = action.payload.code.html;
      state.code.css = action.payload.code.css;
      state.code.js = action.payload.code.js;
    });
  },
});

// Action creators are generated for each case reducer function
export const getProjectData = (state: projectProps) => state.projs;

export const { updateHtml, updateCss, updateJs } = projectSlice.actions;

export default projectSlice.reducer;
