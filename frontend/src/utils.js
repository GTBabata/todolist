const fetchData = async () => {
  try {
    const res = await fetch("http://localhost:3333/tasks");
    const fetchedData = await res.json();

    return fetchedData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTask = async (id) => {
  const res = fetch(`htt://localhost:3333/tasks/${id}`, {
    method: "GET",
  });
  const task = await res.json();

  return task;
};

const getRecentTasks = async () => {
  const res = await fetch("http://localhost:3333/tasks/recent");
  return res.json();
};

const createTask = async (title, description) => {
  const task = { title: title, description: description };

  await fetch("http://localhost:3333/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

const updateTask = async (id, title, description, status) => {
  const taskUpdate = { title: title, description: description, status: status };

  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskUpdate),
  });
};

const updateColor = (status) => {
  switch (status) {
    case "pending":
      return "#db1b1b73";
    case "ongoing":
      return "#f3d62080";
    case "complete":
      return "#1ff04080";
    default:
      return "inherit";
  }
};

const formatDate = (taskDate) => {
  const options = { dateStyle: "long", timeStyle: "short" };
  return new Date(taskDate).toLocaleString("us-en", options);
};

export {
  fetchData,
  createTask,
  updateTask,
  getTask,
  getRecentTasks,
  updateColor,
  formatDate,
};
