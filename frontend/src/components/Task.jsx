import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/modal";

import "./Task.css";
import { useState } from "react";
import { fetchData, updateTask } from "../utils";

const Task = ({ tasks, setTasks }) => {
  const [editing, setEditing] = useState(false);
  const [editTask, setEditTask] = useState({ id: 0, title: "", status: "" });
  const [newTitle, setNewTitle] = useState("");
  const [delTask, setDelTask] = useState({ id: 0, title: "" });

  const formatDate = (taskDate) => {
    const options = { dateStyle: "long", timeStyle: "short" };
    return new Date(taskDate).toLocaleString("pt-br", options);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
      method: "DELETE",
    });

    setDelTask({ id: null, title: "" });

    fetchData()
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  const updateColor = (status) => {
    switch (status) {
      case "pendente":
        return "#db1b1b73";
      case "em andamento":
        return "#f3d62080";
      case "concluida":
        return "#1ff04080";
      default:
        return "inherit";
    }
  };

  const handleEdit = (id, title, status) => {
    setEditing(!editing);
    setEditTask({ id: id, title: title, status: status });
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDone = (task) => {
    updateTask(task.id, newTitle, task.status);
    setEditing(!editing);
    setEditTask(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Criada em</th>
            <th>Status</th>
            <th>Ações</th>
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
                    updateTask(task.id, task.title, e.target.value);
                  }}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em andamento">Em andamento</option>
                  <option value="concluida">Concluída</option>
                </select>
              </td>
              <td>
                {editing && task.id === editTask.id ? (
                  <button
                    className="btn-action btn-done"
                    onClick={() => handleDone(editTask)}
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
