import React, { useEffect, useState } from "react";
import "./Task.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3333/tasks");

    const fetchedTasks = await res.json();
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        {tasks.map((task) => (
          <tbody key={task.id}>
            <tr>
              <td>{task.title}</td>
              <td>{task.created_at}</td>
              <td>
                <select defaultValue={task.status}>
                  <option value="pendente">Pendente</option>
                  <option value="em andamento">Em andamento</option>
                  <option value="concluida">Concluída</option>
                </select>
              </td>
              <td>
                <button className="btn-action btn-edit">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="btn-action btn-delete">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Task;
