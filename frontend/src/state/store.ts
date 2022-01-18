import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import projectsReducer from "./reducers/projectSlice";
import projectszzReducer from "./reducers/projectsSlice";
import sideBarReducer from "./reducers/sideBarSlice";
import userReducer from "./reducers/userSlice";
import cancelReducer from "./reducers/cancelSlice";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projs: projectsReducer,
    projas: projectszzReducer,
    bar: sideBarReducer,
    cancel: cancelReducer,
    authUser: authReducer,
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
