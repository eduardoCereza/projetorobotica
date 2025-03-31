const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'Avalon/KANBAN/public')));

// Middleware para permitir JSON no body das requisições
app.use(express.json());

// Rota para a página inicial (Menu)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Avalon/KANBAN/public', 'index.html'));
});

// Rota para carregar um Kanban específico
app.get('/kanban/:team', (req, res) => {
    const team = req.params.team;
    const filePath = path.join(__dirname, 'Avalon/KANBAN/public', `kanban${team}.html`);

    console.log(`Tentando acessar: ${filePath}`); // DEBUG
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("Kanban não encontrado!");
    }
});


// Rota para carregar tarefas de um Kanban
app.get('/api/tasks/:team', (req, res) => {
    const team = req.params.team;
    const filePath = path.join(__dirname, 'Avalon/data', `kanban${team}.json`);
    
    if (fs.existsSync(filePath)) {
        const tasks = fs.readFileSync(filePath);
        res.json(JSON.parse(tasks));
    } else {
        res.json([]); // Se não existir, retorna um array vazio
    }
});

// Rota para salvar tarefas de um Kanban
app.post('/api/tasks/:team', (req, res) => {
    const team = req.params.team;
    const filePath = path.join(__dirname, 'Avalon/data', `kanban${team}.json`);
    
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ message: 'Tarefas salvas com sucesso!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});