const express = require("express");

const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.use("*", (req, res) => {
    res.send(`<h1>API is up!<h1>`);
})

module.exports = server;
