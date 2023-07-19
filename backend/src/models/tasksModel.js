const connection = require("./conecction");

const getAll = async () => {
  const tasks = await connection.execute("SELECT * FROM tasks");
  return tasks;
};

const getTask = async (id) => {
  const task = await connection.execute("SELECT * FROM tasks WHERE id = ?", [
    id,
  ]);
  return task;
};

const getRecentTasks = async () => {
  const recent = await connection.execute(
    "SELECT * FROM tasks ORDER BY created_at DESC LIMIT 5"
  );
  return recent;
};

const createTask = async (task) => {
  const { title, description } = task;

  const dateUTC = new Date(Date.now()).toUTCString();

  const [createdTask] = await connection.execute(
    "INSERT INTO tasks (title, description,  status, created_at) VALUES (?, ?, ?, ?)",
    [title, description, "pending", dateUTC]
  );

  return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
  const removedTask = await connection.execute(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );

  return removedTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;

  const updatedTask = await connection.execute(
    "UPDATE tasks SET title = ?, status = ? WHERE id = ?",
    [title, status, id]
  );

  return updatedTask;
};

module.exports = {
  getAll,
  getTask,
  getRecentTasks,
  createTask,
  deleteTask,
  updateTask,
};
