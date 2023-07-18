import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Task from "./components/Task";

import { fetchData, createTask } from "./utils";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchedTasks = async () => {
    await fetchData()
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    fetchedTasks();
  }, [tasks]);

  return (
    <div>
      <main>
        <form className="add-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar nova tarefa"
            className="input-task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            +
          </button>
        </form>

        <Task tasks={tasks} setTasks={setTasks} />
      </main>
    </div>
  );
}

export default App;
