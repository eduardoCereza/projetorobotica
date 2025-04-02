//Pega as divs com a classe column
//Criei variaveis para podermos pegar elementos do HTML que iremos manipular. As funcoes querySelectorAll pegam todos 
// os elementos que possuem a classe passada como parametro e retorna um array com todos os elementos encontrados.
const modal = document.querySelectorAll('.modal'); //janela onde adicionamos tarefas
const addTaskButton = document.querySelectorAll('.add-task'); //botao de add nova tarefa
const todolist = document.querySelectorAll('.todo'); //container onde as tarefas são adicionadas

