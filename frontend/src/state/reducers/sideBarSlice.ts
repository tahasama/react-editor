import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  home: false,
  new: false,
  save: false,
  open: false,
  delete: false,
  edit: false,
};
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
        case "Edit":
          state.edit = true;
          break;
        case "Default":
          return initialState;

        default:
          return state;
      }
    },
  },
});
export const { barState } = sideBarSlice.actions;

export default sideBarSlice.reducer;
