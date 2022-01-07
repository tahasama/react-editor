import FullEditor from "./screens/fullEditor";
import Home from "./screens/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectList from "./screens/projectList";
import CreateProject from "./screens/createProject";
import SearchResult from "./screens/searchResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/q=:title" element={<SearchResult />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/editor/:id" element={<FullEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
