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

const createTask = async (title) => {
  const taskTitle = { title: title };

  await fetch("http://localhost:3333/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskTitle),
  });
};

const updateTask = async (id, title, status) => {
  const taskUpdate = { title: title, status: status };

  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskUpdate),
  });
};

export { fetchData, createTask, updateTask };
