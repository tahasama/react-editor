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
import ResetPassword from "./screens/resetPassword";
import Profile from "./screens/profile";
import { saveUser } from "./state/reducers/authSlice";
import ReactEditor from "./components/reactEditor";
import ReactProject from "./components/reactProject";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [dispatch]);
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
        <Route path="/editor/react/:id" element={<FullEditor />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/react" element={<ReactProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
