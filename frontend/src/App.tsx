import FullEditor from "./screens/fullEditor";
import Home from "./screens/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectList from "./screens/projectList";
import CreateProject from "./screens/createProject";
import Login from "./screens/login";
import Register from "./screens/register";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { getUserData, saveUser } from "./state/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "./state/hooks";

function App() {
  const { email } = useAppSelector(getUserData);

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is now", user.email);
        dispatch(saveUser(user));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth]);
  console.log("is he still logged in ?", email);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search/q=:title" element={<ProjectList />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/editor/:id" element={<FullEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
