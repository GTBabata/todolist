import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CreateTask.css";

import React from "react";

import {
  createTask,
  getRecentTasks,
  updateColor,
  updateTask,
  formatDate,
} from "../utils";
import { useState, useEffect } from "react";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [recentTasks, setRecentTasks] = useState([]);

  const recent = () => {
    getRecentTasks()
      .then((data) => setRecentTasks(data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(title, desc);

    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    recent();
  }, [handleSubmit]);

  return (
    <div className="create-task">
      <main>
        <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="inputs container-fluid">
            <input
              type="text"
              placeholder="Create new task"
              className="input-task row"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              type="text"
              placeholder="Description (Optional)"
              className="input-desc row"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>

          <button type="submit" className="btn-submit">
            <i className="bi bi-file-earmark-plus"></i>
          </button>
        </form>
      </main>

      <div>
        <h1 className="recent-tasks">Recent tasks</h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Created at</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentTasks.map((task) => (
            <tr key={task.id}>
              <td style={{ backgroundColor: updateColor(task.status) }}>
                {task.title}
              </td>
              <td>{formatDate(task.created_at)}</td>
              <td>
                <select
                  defaultValue={task.status}
                  onChange={(e) => {
                    updateTask(task.id, task.title, null, e.target.value);
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="complete">Complete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateTask;
