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
