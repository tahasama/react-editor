import { createSlice } from "@reduxjs/toolkit";

export const cancelInitialState = {
  cancelImage: false,
  cancelInfo: false,
};

export const cancelSlice = createSlice({
  name: "cancel-redux",
  initialState: cancelInitialState,
  reducers: {
    cancelState: (state, action) => {
      state.cancelImage = action.payload.cancelImage;
      state.cancelInfo = action.payload.cancelInfo;
    },
  },
});
export const { cancelState } = cancelSlice.actions;

export default cancelSlice.reducer;
