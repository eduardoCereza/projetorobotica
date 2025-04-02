//Pega as divs com a classe column
//Criei variaveis para podermos pegar elementos do HTML que iremos manipular. As funcoes querySelectorAll pegam todos 
// os elementos que possuem a classe passada como parametro e retorna um array com todos os elementos encontrados.
const modal = document.querySelectorAll('.modal'); //janela onde adicionamos tarefas
const addTaskButton = document.querySelectorAll('.add-task'); //botao de add nova tarefa
const todolist = document.querySelectorAll('.todo'); //container onde as tarefas são adicionadas

//Passo 1: Clicar para abrir JANELA
//quando eu clicar em Adicionar tarefa, a janela modal aparece, por conta funcao addEventListener
document.querySelector('.add-task').addEventListener('click', function() {
    modal.style.display = 'block'; //ao clicar no botao, a janela modal aparece
});

//Passo 2: Clicar para fechar JANELA
//quando eu clicar no botao fechar, a janela modal desaparece, por conta funcao addEventListener
document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none'; //ao clicar no botao fechar, a janela modal desaparece
});

//Passo 3: Clicar para adicionar tarefa
//quando eu clicar no botao adicionar, a tarefa é adicionada na lista de tarefas
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none'; //ao clicar fora da janela modal, a janela desaparece
    }
});

//Passo 4: Adicionar tarefa
//a funcao getElementById vai buscar no HTML a div com base no que queremos
addTaskButton.addEventListener('click', function() {
    const taskName = document.getElementById('task-name').value; //vai buscar no HTML a div com o ID task-name
    const taskCategory = document.getElementById('task-category').value; //vai buscar no HTML a div com o ID task-category
    const taskPriority = document.getElementById('task-priority').value; //vai buscar no HTML a div com o ID task-priority
});

//Se o campo de nome da tarefa estiver vazio, exibe um alerta
if (taskName.trim() == ""){
    alert("Digite o nome da tarefa!");
    return;
}

//Quando eu nn seleciono nenhuma tarefa, exibe um alerta no meu navegador com a frase. Testei e achei interessante

//Cria uma lista para designar o nome, a categoria e a prioridade da tarefa dentro de uma varivael constante
const task = {
    nome: taskName,
    category: taskCategory,
    priority: taskPriority 
};

//a variavel taskElement vai criar um elemento div, que vai ser a tarefa
const taskElement = document.createElement('div');
taskElement.classList.add('task'); //adiciona a classe task na div -- a classe task é a tarefa que colocamos nos containers de situacao da tarefa
taskElement.setAttribute('draggable', 'true'); //adiciona o atributo draggable na div -- o atributo draggable permite que o elemento seja arrastado
taskElement.setAttribute('id', taskName); //adiciona o atributo id na div -- o atributo id é o nome da tarefa
taskElement.addEventListener('dragstart', drag); //adiciona o evento dragstart na div -- o evento dragstart é acionado quando o elemento começa a ser arrastado
taskElement.innerHTML = `
    <h3>${taskName}</h3>
    <p>Categoria: ${taskCategory}</p>
    <p>Prioridade: ${taskPriority}</p>
    <button class="delete-task">Excluir</button>
`; //adiciona o conteudo da tarefa na div -- o conteudo da tarefa é o nome, a categoria e a prioridade da tarefa

todoList.appendChild(taskElement); //adiciona a tarefa na lista de tarefas -- a lista de tarefas é o container onde as tarefas são adicionadas

modal.style.display = 'none'; //ao clicar no botao adicionar, a janela modal desaparece
document.getElementById('task-name').value = ''; //limpa o campo de nome da tarefa