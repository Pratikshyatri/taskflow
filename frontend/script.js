const API = "/api/tasks";

let tasks = [];
let filter = "all";

async function loadTasks() {
    try {
        const res = await fetch(API);
        tasks = await res.json();
        updateStats();
        renderTasks();
    } catch (error) {
        console.error(error);
    }
}

function openModal(task = null) {
    document.getElementById("taskModal").classList.add("show");
    document.getElementById("taskForm").reset();

    if (task) {
        document.getElementById("modalTitle").textContent = "Edit Task";
        document.getElementById("taskId").value = task._id;
        document.getElementById("title").value = task.title;
        document.getElementById("description").value = task.description || "";
        document.getElementById("priority").value = task.priority;
        document.getElementById("dueDate").value =
            task.dueDate ? task.dueDate.substring(0, 10) : "";
    } else {
        document.getElementById("modalTitle").textContent = "Add New Task";
        document.getElementById("taskId").value = "";
    }
}

function closeModal() {
    document.getElementById("taskModal").classList.remove("show");
}

document.getElementById("taskForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const id = document.getElementById("taskId").value;

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        dueDate: document.getElementById("dueDate").value || null
    };

    try {
        const res = await fetch(id ? `${API}/${id}` : API, {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (!res.ok) {
            throw new Error("Unable to save task");
        }

        closeModal();
        loadTasks();

    } catch (error) {
        console.error(error);
        alert("Unable to add task");
    }
});

async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

async function toggleTask(id, completed) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            completed: !completed
        })
    });

    loadTasks();
}

function editTask(task) {
    openModal(task);
}

function renderTasks() {
    const container = document.getElementById("taskContainer");
    const search = document.getElementById("searchInput").value.toLowerCase();
    const priority = document.getElementById("priorityFilter").value;

    let list = tasks.filter(task => {
        if (filter === "pending" && task.completed) return false;
        if (filter === "completed" && !task.completed) return false;
        if (filter === "High" && task.priority !== "High") return false;

        if (
            search &&
            !task.title.toLowerCase().includes(search) &&
            !(task.description || "").toLowerCase().includes(search)
        ) {
            return false;
        }

        if (priority !== "all" && task.priority !== priority) {
            return false;
        }

        return true;
    });

    document.getElementById("taskCount").textContent =
        `${list.length} ${list.length === 1 ? "task" : "tasks"}`;

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty">
                <div class="empty-icon">📋</div>
                <h3>No tasks found</h3>
                <p>Add a new task to get started.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(task => `
        <div class="task-card ${task.completed ? "completed" : ""}">
            <div class="task-top">
                <div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-description">
                        ${task.description || ""}
                    </div>
                </div>

                <div class="task-actions">
                    <button onclick="toggleTask('${task._id}', ${task.completed})">
                        ${task.completed ? "↩️" : "✓"}
                    </button>

                    <button onclick='editTask(${JSON.stringify(task)})'>
                        ✏️
                    </button>

                    <button onclick="deleteTask('${task._id}')">
                        🗑️
                    </button>
                </div>
            </div>

            <div class="task-meta">
                <span class="priority ${task.priority}">
                    ${task.priority}
                </span>

                ${
                    task.dueDate
                    ? `<span class="due-date">
                        📅 ${new Date(task.dueDate).toLocaleDateString()}
                    </span>`
                    : ""
                }
            </div>
        </div>
    `).join("");
}

function filterTasks(value) {
    filter = value;
    renderTasks();
}

function showAllTasks() {
    filter = "all";
    renderTasks();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const high = tasks.filter(
        task => task.priority === "High" && !task.completed
    ).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("highTasks").textContent = high;
}

loadTasks();