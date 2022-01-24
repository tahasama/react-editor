import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  cssExample,
  example1,
  example2,
  htmlExample,
  javaScriptExample,
} from "../../example";

const POJECT_URL: any = process.env.REACT_APP_PROJECT_URL;

export const fetchProject = createAsyncThunk(
  "fetchProject",
  async (_id: any) => {
    try {
      const res = await axios.get(POJECT_URL + _id);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export interface valueProps {
  uid: string | undefined;
  email: string | undefined;
  title: string | undefined;
  description: string | undefined;
  username?: string | undefined;
  star?: string[];
  type: string;
  cells?: { cellId: string; cellCode: string }[];
  code?: {
    html: string | undefined;
    css: string | undefined;
    js: string | undefined;
  };
}

export const creatProject = createAsyncThunk(
  "creatProject",
  async (value: valueProps) => {
    if (value.type === "reactProject") {
      value = {
        ...value,
        cells: [
          { cellId: uuidv4(), cellCode: example1 },
          { cellId: uuidv4(), cellCode: example2 },
        ],
      };
    } else {
      value = {
        ...value,
        code: { html: htmlExample, css: cssExample, js: javaScriptExample },
      };
    }
    try {
      const res = await axios.post(POJECT_URL, value);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
interface cloneProps {
  reactCode?: string;
  uid: string;
  user: string; //| undefined;
  title: string | undefined;
  description: string | undefined;
  code?: {
    html: string | undefined;
    css: string | undefined;
    js: string | undefined;
  };
  cells?: { cellId: string; cellCode: string }[];
  type: string;
}

export const cloneProject = createAsyncThunk(
  "cloneProject",
  async (val: cloneProps) => {
    const object: any = {
      ...val,
      email: val.user,
      title: val.title + "  " + uuidv4(),
    };
    const res = await axios.post(POJECT_URL, object);
    return res.data;
  }
);

interface saveProps {
  _id: string | undefined;
  title: string;
  description: string;
  code?: {
    html: string | undefined;
    css: string | undefined;
    js: string | undefined;
  };
  cells?: { cellId: string; cellCode: string }[];
}

export const saveProject = createAsyncThunk(
  "saveProject",
  async (value: saveProps) => {
    const object = {
      _id: value._id,
    };
    const res = await axios.put(POJECT_URL + object._id, value);
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
      const res = await axios.put(POJECT_URL + "star/" + object._id, value);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (id: string | undefined) => {
    await axios.delete(POJECT_URL + id);
  }
);
export interface projectProps {
  projs: {
    _id: string;
    user: string;
    title: string;
    description: string;
    code?: { html: string; css: string; js: string };
    err: string;
    createdAt: string;
    updatedAt: string;
    saved: boolean;
    star: string[];
    reactCode: string;
    type: string;
    cells?: { cellId: string; cellCode: string }[];
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
  cells: [{ cellId: "", cellCode: "" }],
  reactCode: "",
  type: "",
};

export const projectSlice = createSlice({
  name: "project-redux",
  initialState: projectInitialState,
  reducers: {
    updateCode: (state, action) => {
      Object.assign(state.code, action.payload.code);
    },
    AddCells: (state, action) => {
      // state.cells.push(action.payload);
      state.cells.splice(-1, 0, action.payload);
    },

    DeleteCells: (state, action) => {
      state.cells = state.cells.filter(
        (cell) => cell.cellId !== action.payload.cellId
      );
    },

    updateCellCode: (state, action) => {
      console.log("action.payload.reactCode...", action.payload);
      const cell = state.cells.find(
        (cell) => cell.cellId === action.payload.cellId
      );
      if (cell) {
        cell.cellCode = action.payload.cellCode;
      }
      console.log("cell...", cell?.cellCode);
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
      state.cells = action.payload.cells;
      state.code = action.payload.code;
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
  updateCellCode,
  AddCells,
  DeleteCells,
} = projectSlice.actions;

export default projectSlice.reducer;
