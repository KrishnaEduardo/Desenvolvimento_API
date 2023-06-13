const restify = require("restify")
const errors = require("restify-errors")
const corsMiddleware = require("restify-cors-middleware2")
const cors = corsMiddleware({
    origins: ['*']
});

const servidor = restify.createServer({
    name : 'loja_dsapi',
    version : '1.0.0'
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.pre(cors.preflight);
servidor.use(cors.actual);

servidor.listen(8001, function(){
    console.log("Executando em https://localhost:8001");
});

var knex = require('knex')({
    client : 'mysql',
    connection : {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'loja_dsapi'
    }
});

servidor.get('/', (req, res, next) => {
    res.send('Bem-Vindo à API da loja!')
});

servidor.get('/clientes', (req, res, next) => {
    knex('clientes').then((dados) => {
        res.send(dados)
    }, next);
});

servidor.post('/clientes', (req, res, next) => {
    knex('clientes')
        .insert(req.body)
        .then((dados) => {
            res.send(dados)
        }, next);
});

servidor.get('/produtos', (req, res, next) => {
    knex('produtos').then((dados) => {
        res.send(dados)
    }, next);
});

servidor.get('/produtos/:idProduto', (req, res, next) => {
    const idProduto = req.params.idProduto;
    knex('produtos')
        .where('id', idProduto)
        .first()
        .then((dados) => {
            if(!dados){
                return res.send(new errors.BadRequestError('Produto não foi encontrado'))
            }
            res.send(dados)
        }, next);
});

servidor.get('/pedidos', (req, res, next) => {
    knex('pedidos').then((dados) => {
        res.send(dados)
    }, next);
});

servidor.post('/pedidos', (req, res, next) => {
    knex('pedidos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados)
        }, next);
});

servidor.get('/pedidos/:idPedido', (req, res, next) => {
    const idPedido = req.params.idPedido;
    knex('pedidos')
        .where('id', idPedido)
        .first()
        .then((dados) => {
            if(!dados){
                return res.send(new errors.BadRequestError('Pedido não encontrado'))
            }
            res.send(dados)
        }, next);
});

servidor.get('/pedidosprodutos', (req, res, next) => {
    knex('pedido_produto').then((dados) => {
        res.send(dados)
    }, next);
});

servidor.post('/pedidosprodutos', (req, res, next) => {
    knex('pedido_produto')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

servidor.get('/admin', (req, res, next) => {
    res.send('Bem-Vindo ao painel do administrador!')
});

servidor.post('/produtos', (req, res, next) => {
    knex('produtos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados)
        }, next);
});

servidor.put('/produtos/:idProduto', (req, res, next) => {
    const idProduto = req.params.idProduto;
    knex('produtos')
        .where('id', idProduto)
        .update(req.body)
        .then((dados) => {
            if(!dados){
                return res.send(new errors.BadRequestError('Produto não foi encontrado'))
            }
            res.send('Produto atualizado.')
        }, next);
});

servidor.del('/produtos/:idProduto', (req, res, next) => {
    const idProduto = req.params.idProduto;
    knex('produtos')
        .where('id', idProduto)
        .delete()
        .then((dados) => {
            if(!dados){
                return res.send(new errors.BadRequestError('O produto não encontrado'))
            }
            res.send('Produto deletado.')
        }, next);
});

servidor.put('/pedidos/:idPedido', (req, res, next) => {
    const idPedido = req.params.idPedido;
    knex('pedidos')
        .where('id', idPedido)
        .update(req.body)
        .then((dados) => {
            if(!dados){
                return res.send(new errors.BadRequestError('Pedido não foi encontrado'))
            }
            res.send('Pedido atualizado.')
        }, next);
});

servidor.del('/pedidos/:idPedido', (req, res, next) => {
    const idPedido = req.params.idPedido;
    knex('pedidos')
        .where('id', idPedido)
        .delete()
        .then((dados) => {
            if(!dados){
                return res.send(new errors.BadRequestError('O pedido não encontrado'))
            }
            res.send('Pedido deletado.')
        }, next);
});