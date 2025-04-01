//depenncias do node.js para iniciar e rodar o servidor

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
// Rota para carregar tarefas do arquivo tasks.json
// Rota para carregar tarefas de kanban1.json ou kanban2.json, dependendo da equipe
app.get('/api/tasks/:team', (req, res) => {
    const team = req.params.team;
    const filePath = path.join(__dirname, 'Avalon/data', `kanban${team}.json`);  // Alterado para carregar o arquivo da equipe
    
    if (fs.existsSync(filePath)) {
        const tasks = fs.readFileSync(filePath);
        res.json(JSON.parse(tasks));
    } else {
        res.json([]);  // Se o arquivo não existir, retorna um array vazio
    }
});



// Rota para salvar tarefas de um Kanban
// Rota para salvar tarefas no arquivo tasks.json
// Rota para salvar tarefas em kanban1.json ou kanban2.json, dependendo da equipe
app.post('/api/tasks/:team', (req, res) => {
    const team = req.params.team;
    const filePath = path.join(__dirname, 'Avalon/data', `kanban${team}.json`);  // Alterado para salvar com o nome do time
    
    try {
        // Salva as tarefas no arquivo específico da equipe
        fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
        res.json({ message: 'Tarefas salvas com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
        res.status(500).json({ message: 'Erro ao salvar tarefas!' });
    }
});



// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});