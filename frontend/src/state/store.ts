import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import projectsReducer from "./reducers/projectSlice";
import projectszzReducer from "./reducers/projectsSlice";
import sideBarReducer from "./reducers/sideBarSlice";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projs: projectsReducer,
    projas: projectszzReducer,
    bar: sideBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
