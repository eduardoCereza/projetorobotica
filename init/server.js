const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public'))); // A pasta 'public' vai conter seus arquivos HTML, CSS, JS

// Caminho do arquivo JSON onde as tarefas serão salvas
const filePath = path.join(__dirname, 'tasks.json');

// Rota para pegar as tarefas
app.get('/tasks', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao carregar as tarefas');
        }
        res.json(JSON.parse(data));
    });
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
    const newTask = req.body;

    // Ler as tarefas existentes
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao salvar a tarefa');
        }

        const tasks = JSON.parse(data);
        tasks.push(newTask);

        // Salvar as tarefas de volta no arquivo JSON
        fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar a tarefa');
            }
            res.status(200).send('Tarefa salva com sucesso');
        });
    });
});

// Rota para página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "init","init.html")); // Certifique-se de que o index.html está na pasta 'public'
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
