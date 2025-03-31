document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("taskModal");
    const addTaskButton = document.getElementById("addTask");
    const todoList = document.getElementById("todo");

    // Identifique qual Kanban você está acessando pela URL
    const team = window.location.pathname.split('/')[2]; // Assume que a URL tem o formato /kanban1 ou /kanban2
    
    if (!team) {
        console.error('Equipe não especificada!');
        return;
    }

    // Carregar tarefas do servidor
    carregarTarefas(team);

    document.querySelector(".add-task").addEventListener("click", function () {
        modal.style.display = "block";
    });

    document.querySelector(".close").addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    addTaskButton.addEventListener("click", function () {
        const taskName = document.getElementById("taskName").value;
        const taskCategory = document.getElementById("taskCategory").value;
        const taskPriority = document.getElementById("taskPriority").value;

        if (taskName.trim() === "") {
            alert("Digite um nome para a tarefa!");
            return;
        }

        const task = {
            id: `task-${Date.now()}`,
            name: taskName,
            category: taskCategory,
            priority: taskPriority
        };

        // Enviar tarefa para o servidor (salvar no JSON da equipe específica)
        salvarTarefaNoServidor(team, task);

        // Criar o elemento da tarefa no HTML
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.setAttribute("draggable", "true");
        taskElement.setAttribute("id", task.id);
        taskElement.addEventListener("dragstart", drag);
        taskElement.innerHTML = `
            <p><strong>${task.name}</strong></p>
            <p>Categoria: ${task.category}</p>
            <p>Prioridade: <span class="priority-${task.priority}">${task.priority}</span></p>
        `;
        todoList.appendChild(taskElement);

        // Fechar o modal
        modal.style.display = "none";
        document.getElementById("taskName").value = "";
    });

    // Função para carregar as tarefas do servidor
    function carregarTarefas(team) {
        fetch(`http://localhost:3000/api/tasks/${team}`)
            .then(response => response.json())
            .then(tasks => {
                tasks.forEach(task => {
                    const taskElement = document.createElement("div");
                    taskElement.classList.add("task");
                    taskElement.setAttribute("draggable", "true");
                    taskElement.setAttribute("id", task.id);
                    taskElement.addEventListener("dragstart", drag);
                    taskElement.innerHTML = `
                        <p><strong>${task.name}</strong></p>
                        <p>Categoria: ${task.category}</p>
                        <p>Prioridade: <span class="priority-${task.priority}">${task.priority}</span></p>
                    `;
                    todoList.appendChild(taskElement);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar as tarefas", error);
            });
    }

    // Função para salvar a tarefa no servidor
    function salvarTarefaNoServidor(team, task) {
        fetch(`http://localhost:3000/api/tasks/${team}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => {
            if (response.ok) {
                console.log("Tarefa salva com sucesso!");
            } else {
                console.error("Erro ao salvar tarefa!");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar tarefa para o servidor", error);
        });
    }

    // Permitir que os elementos arrastáveis possam ser soltos
    const dropZones = document.querySelectorAll(".task-list");
    dropZones.forEach(zone => {
        zone.addEventListener("dragover", allowDrop);
        zone.addEventListener("drop", drop);
    });
});

// Função para permitir soltar
function allowDrop(event) {
    event.preventDefault();
}

// Função para iniciar o arrastar
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Função para soltar na nova categoria
function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const task = document.getElementById(taskId);
    
    if (task) {
        event.target.appendChild(task);
    }
}
