const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const PORT = 3000;

const lanches = require('./public/data/lanches.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', './views');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/sugestao', (req, res) => {
    const data = {
        nome: req.query.nome,
        ingredientes: req.query.ingredientes
    }
    res.render('sugestao_recebida.html', data);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'));
});

app.post('/contato', (req, res) => {
    const data = {
        nome: req.body.nome,
        email: req.body.email,
        assunto: req.body.assunto,
        mensagem: req.body.mensagem
    }
    res.render('contato_recebido.html', data);
});

app.get('/api/lanches', (req, res) => {
    res.json(lanches);
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});