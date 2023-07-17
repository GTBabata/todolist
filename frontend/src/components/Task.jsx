import "./Task.css";
import { useState } from "react";
import { fetchData, updateTask } from "../utils";

const Task = ({ tasks, setTasks }) => {
  const [editing, setEditing] = useState(false);
  const [editTask, setEditTask] = useState({ id: 0, title: "", status: "" });
  const [newTitle, setNewTitle] = useState("");

  const formatDate = (taskDate) => {
    const options = { dateStyle: "long", timeStyle: "short" };
    return new Date(taskDate).toLocaleString("pt-br", options);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
      method: "DELETE",
    });

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
                    <span className="material-symbols-outlined">done</span>
                  </button>
                ) : (
                  <button
                    className="btn-action btn-edit"
                    onClick={() => handleEdit(task.id, task.title, task.status)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                )}

                <button
                  className="btn-action btn-delete"
                  onClick={() => deleteTask(task.id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
