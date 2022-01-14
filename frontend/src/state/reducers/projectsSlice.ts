import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useAppSelector } from "../hooks";
import { getUserData } from "./userSlice";

export const fetchAllProject = createAsyncThunk(
  "fetchAllProject",
  async (user: string | undefined) => {
    console.log(user);
    const res = await axios.get(
      "http://localhost:5000/api/project/all/" + user
    );
    return res.data;
  }
);

export const searchProject = createAsyncThunk(
  "searchProject",
  async (projectTitle: string | undefined) => {
    const res = await axios.get(
      "http://localhost:5000/api/project/search/q=" + projectTitle
    );

    return res.data;
  }
);
interface projectsProps {
  projas: { all: {}[]; loading: boolean };
}

const initialState = {
  all: [
    {
      _id: "",
      title: "",
      code: { html: "", css: "", js: "" },
      createdAt: "",
      updatedAt: "",
    },
  ],
  loading: true,
};

export const projectsSlice = createSlice({
  name: "projects-redux",
  initialState: initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProject.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.all.splice(0, 1);
      state.loading = false;
    });
    builder.addCase(searchProject.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.all.splice(0, 1);
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const getProjectsData = (state: projectsProps) => state.projas;

export const { updateLoading } = projectsSlice.actions;

export default projectsSlice.reducer;
