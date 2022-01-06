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
interface titleProps {
  id: string | undefined;
  newTitle: { title: string };
}

export const saveProject = createAsyncThunk(
  "saveProject",
  async ({ newData, id }: codeProps) => {
    const res = await axios.put("http://localhost:5000/api/project/" + id, {
      newData,
    });
    return res.data;
  }
);
export const updateName = createAsyncThunk(
  "saveProject",
  async ({ newTitle, id }: titleProps) => {
    console.log(
      "insiiiiiide updateName goooooooooo",
      newTitle,
      "an also the id",
      id
    );
    const res = await axios.put(
      "http://localhost:5000/api/project/" + id,
      newTitle
    );
    console.log("sucessssss", res.data);
    return res.data;
  }
);

export const deleteProject = createAsyncThunk(
  "creatProject",
  async (id: string | undefined) => {
    await axios.delete("http://localhost:5000/api/project/" + id);
  }
);

export interface projectProps {
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
      state._id = action.payload;
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
