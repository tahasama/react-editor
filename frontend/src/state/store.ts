import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import projectsReducer from "./reducers/projectSlice";
import projectszzReducer from "./reducers/projectsSlice";
import sideBarReducer from "./reducers/sideBarSlice";

export const store = configureStore({
  reducer: {
    projs: projectsReducer,
    projas: projectszzReducer,
    bar: sideBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
console.log("my store", store.getState());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
