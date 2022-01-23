import { createSlice } from "@reduxjs/toolkit";
export const sideBArInitialState = {
  home: false,
  new: false,
  save: false,
  open: false,
  delete: false,
  edit: false,
  code: false,
  star: false,
  react: false,
};
export const sideBarSlice = createSlice({
  name: "bar-redux",
  initialState: sideBArInitialState,
  reducers: {
    barState: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});
export const { barState } = sideBarSlice.actions;

export default sideBarSlice.reducer;
