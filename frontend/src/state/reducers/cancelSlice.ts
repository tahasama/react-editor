import { createSlice, current } from "@reduxjs/toolkit";
import { AiOutlineConsoleSql } from "react-icons/ai";
export const cancelInitialState = {
  cancelImage: false,
  cancelInfo: false,
};
export const cancelSlice = createSlice({
  name: "cancel-redux",
  initialState: cancelInitialState,
  reducers: {
    cancelState: (state, action) => {
      console.log("states...", action.payload.cancelImage);
      state.cancelImage = action.payload.cancelImage;
      state.cancelInfo = action.payload.cancelInfo;
    },
  },
});
export const { cancelState } = cancelSlice.actions;

export default cancelSlice.reducer;