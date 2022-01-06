import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProject = createAsyncThunk("fetchAllProject", async () => {
  const res = await axios.get("http://localhost:5000/api/project/");
  return res.data;
});

interface projectsProps {
  projas: {
    _id: string;
    title: string;
    code: { html: string; css: string; js: string };
  }[];
}

export const projectsSlice = createSlice({
  name: "projects-redux",
  initialState: [
    {
      _id: "",
      title: "",
      code: { html: "", css: "", js: "" },
    },
  ],

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProject.fulfilled, (state, action) => {
      state.push(action.payload);
      state.splice(0, 1);
    });
  },
});

// Action creators are generated for each case reducer function
export const getProjectsData = (state: projectsProps) => state.projas;

export const {} = projectsSlice.actions;

export default projectsSlice.reducer;
