import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProject = createAsyncThunk(
  "fetchAllProject",
  async (uid: string | undefined) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/project/all/" + uid
      );
      return res.data;
    } catch (error) {
      console.log("fetchAllProject error...", error);
    }
  }
);

export const searchProject = createAsyncThunk(
  "searchProject",
  async (projectTitle: string | undefined) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/project/search/q=" + projectTitle
      );
      return res.data;
    } catch (error) {
      console.log("searchProject error...", error);
    }
  }
);
interface projectsProps {
  projas: { all: {}[]; searchAll: {}[]; loading: boolean };
}

const initialState = {
  all: [{}],
  searchAll: [{}],
  loading: true,
};

export const projectsSlice = createSlice({
  name: "projects-redux",
  initialState: initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    filteredProjects: (state, action) => {
      console.log("filtering zooooooooone", action.payload);
      state.all = action.payload;
      console.log("filtering staaaaaaaaaaaate", state.all);
    },
    cleanUpProjects: (state, action) => {
      // console.log("cleaning zooooooooone", action.payload);
      state.all = action.payload;
      state.searchAll = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProject.fulfilled, (state, action) => {
      state.all.push(action.payload);
      // console.log("STATSATSTATSTA", state.all);
      state.all.splice(0, 1);
      state.loading = false;
    });
    builder.addCase(searchProject.fulfilled, (state, action) => {
      state.searchAll.push(action.payload);
      state.searchAll.splice(0, 1);
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const getProjectsData = (state: projectsProps) => state.projas;

export const { updateLoading, cleanUpProjects, filteredProjects } =
  projectsSlice.actions;

export default projectsSlice.reducer;
