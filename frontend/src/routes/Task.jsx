import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/modal";
import "./Task.css";

import { useState, useEffect } from "react";
import { fetchData, updateTask, updateColor, formatDate } from "../utils";

const Task = () => {
  const [editing, setEditing] = useState(false);
  const [editTask, setEditTask] = useState({ id: 0, title: "", status: "" });
  const [newTitle, setNewTitle] = useState("");
  const [delTask, setDelTask] = useState({ id: 0, title: "" });

  const [tasks, setTasks] = useState([]);

  const fetchedTasks = async () => {
    await fetchData()
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchedTasks();
  }, []);

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
      method: "DELETE",
    });

    setDelTask({ id: null, title: "" });

    fetchedTasks();
  };

  const handleEdit = (id, title, status) => {
    setEditing(!editing);
    setEditTask({ id: id, title: title, status: status });
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDone = () => {
    updateTask(editTask.id, newTitle, null, editTask.status);
    setEditing(!editing);
    setEditTask(null);
  };

  return (
    <div className="tasks-table">
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Created at</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              {editing && task.id === editTask.id ? (
                <td>
                  <input
                    type="text"
                    placeholder={task.title}
                    value={task.title}
                    onChange={handleChange}
                  />
                </td>
              ) : (
                <td style={{ backgroundColor: updateColor(task.status) }}>
                  {task.title}
                </td>
              )}
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
              <td>
                {editing && task.id === editTask.id ? (
                  <button
                    className="btn-action btn-done"
                    onClick={() => handleDone()}
                  >
                    <i className="bi bi-check"></i>
                  </button>
                ) : (
                  <button
                    className="btn-action btn-edit"
                    onClick={() => handleEdit(task.id, task.title, task.status)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                )}

                <button
                  className="btn-action btn-delete"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={() => setDelTask({ id: task.id, title: task.title })}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="deleteModalLabel">
                Deletar: {delTask.title}?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteTask(delTask.id)}
              >
                Deletar
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
