// قائمة مهام بسيطة
// الفكرة: مصفوفة فيها المهام، كل مهمة عبارة عن object فيها النص وحالتها (تمت ولا لأ)

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = []; // كل مهمة: { text: "...", done: false }

function renderTasks(){
  taskList.innerHTML = ""; // نمسح القائمة القديمة ونرسمها تاني

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if(task.done) li.classList.add("done");

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "حذف";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  emptyMessage.classList.toggle("hidden", tasks.length > 0);
}

function addTask(){
  const text = taskInput.value.trim();
  if(text === "") return;

  tasks.push({ text: text, done: false });
  taskInput.value = "";
  taskInput.focus();
  renderTasks();
}

function toggleTask(index){
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index){
  tasks = tasks.filter((task, i) => i !== index);
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
  if(event.key === "Enter") addTask();
});

renderTasks();
