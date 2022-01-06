import axios from "axios";
import React, { useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";

import "./home.css";

const Home = () => {
  const [InputItem, setInputItem] = useState<string>("");
  const [searchResults, setsearchResults] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleNewProjectClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    navigate("/create");
  };

  const handleOpenProjectClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    navigate("/projects");
  };

  const handleSearch = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/project/search/q=" + InputItem
    );
    console.log("sersult search", data);
    // navigate("/editor/" + res.data[0]._id);
    setsearchResults(data);
    return data;
  };
  console.log("qqqqqqqqqqqqqqqqqqqq", searchResults);

  const chandleChangeSearch = (e: any) => {
    setInputItem(e.target.value);
    setsearchResults([]);
  };

  return (
    <div>
      <div className="search">
        <input
          className="updateInput"
          type="text"
          placeholder="Search..."
          onChange={chandleChangeSearch}
        />
        <button className="saveButton" onClick={handleSearch}>
          Go
        </button>
      </div>
      <div className="home">
        {!InputItem && (
          <div>
            <h3 className="intro">
              Welcome to ThaCoder, got an idea? want to learn? or having fun
              with code? Start now !!!
            </h3>
            <div className="buttonWrapper">
              <button className="buttona a" onClick={handleNewProjectClick}>
                Start a new Project
              </button>
              <button className="buttona b" onClick={handleOpenProjectClick}>
                Open a project
              </button>
            </div>
          </div>
        )}

        <SideBar />
      </div>
      {InputItem && (
        <div className="projectsList homeList">
          {searchResults.map((result: any) => (
            <div key={result._id}>
              <Link to={"/editor/" + result._id} className="project">
                <FcOpenedFolder className="icon" />
                <p className="name">{result.title}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
