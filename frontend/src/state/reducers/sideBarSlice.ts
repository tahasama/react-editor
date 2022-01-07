import { createSlice } from "@reduxjs/toolkit";

export const sideBarSlice = createSlice({
  name: "bar-redux",
  initialState: {
    home: false,
    new: false,
    save: false,
    open: false,
    delete: false,
    edit: false,
  },
  reducers: {
    barState: (state, action) => {
      switch (action.payload.type) {
        case "Home":
          state.home = true;
          break;
        case "Save":
          state.save = true;
          break;
        case "New":
          state.new = true;
          break;
        case "Open":
          state.open = true;
          break;
        case "Delete":
          state.delete = true;
          break;
        case "edit":
          state.edit = true;
          break;
        case "Default":
          state.delete = false;
          state.home = false;
          state.save = false;
          state.new = false;
          state.open = false;
          state.delete = false;
          state.edit = false;
          break;
        default:
          return state;
      }
      console.log("uyuyuyuyuyuyuyuyu", state.home);
    },
  },
});
export const { barState } = sideBarSlice.actions;

export default sideBarSlice.reducer;
