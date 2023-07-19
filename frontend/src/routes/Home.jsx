import "./Home.css";
import React from "react";

import todoListSvg from "../assets/todo-list.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="image-bg">
        <img src={todoListSvg} alt="todo-list-svg" className="image" />
      </div>
      <div className="text">
        <div className="todo-text">
          <h1>To-do list</h1>
        </div>
        <div className="options-text">
          <Link to="/tasks" className="link">
            <h1 className="view-text">View tasks</h1>
          </Link>
          <Link to="/create" className="link">
            <h1 className="create-text">Create new task</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
