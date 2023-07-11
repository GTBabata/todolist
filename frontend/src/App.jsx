import "./App.css";
import Task from "./components/Task";

function App() {
  const addTask = async (e) => {
    e.preventDefault();
    const title = "asd";

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: title,
    });
  };

  return (
    <div>
      <main>
        <form className="add-form">
          <input
            type="text"
            placeholder="Adicionar nova tarefa"
            className="input-task"
          />
          <button
            type="submit"
            className="btn-submit"
            onSubmit={(e) => addTask(e)}
          >
            +
          </button>
        </form>

        <Task />
      </main>
    </div>
  );
}

export default App;
