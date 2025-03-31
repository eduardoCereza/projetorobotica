document.addEventListener("DOMContentLoaded", function () {
    const kanbanId = window.location.pathname.includes("kanban1") ? "kanban1" : "kanban2";
    const tasks = JSON.parse(localStorage.getItem(kanbanId)) || {};

    function saveTasks() {
        localStorage.setItem(kanbanId, JSON.stringify(tasks));
    }

    function loadTasks() {
        Object.keys(tasks).forEach(id => {
            const task = tasks[id];
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");
            taskElement.setAttribute("draggable", "true");
            taskElement.setAttribute("id", id);
            taskElement.innerHTML = `
                <p><strong>${task.name}</strong></p>
                <p>Categoria: ${task.category}</p>
                <p>Prioridade: <span class="priority-${task.priority}">${task.priority}</span></p>
            `;
            document.getElementById(task.column).appendChild(taskElement);
        });
    }

    loadTasks();

    document.getElementById("addTask").addEventListener("click", function () {
        const taskName = document.getElementById("taskName").value;
        const taskCategory = document.getElementById("taskCategory").value;
        const taskPriority = document.getElementById("taskPriority").value;

        if (taskName.trim() === "") {
            alert("Digite um nome para a tarefa!");
            return;
        }

        const taskId = `task-${Date.now()}`;
        tasks[taskId] = {
            name: taskName,
            category: taskCategory,
            priority: taskPriority,
            column: "todo"
        };

        saveTasks();
        location.reload();
    });

    document.querySelectorAll(".task-list").forEach(zone => {
        zone.addEventListener("drop", function (event) {
            event.preventDefault();
            const taskId = event.dataTransfer.getData("text");
            const task = document.getElementById(taskId);

            if (task) {
                event.target.appendChild(task);
                tasks[taskId].column = event.target.id;
                saveTasks();
            }
        });
    });
});
