const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors('*'));
server.use(express.json());

// const booksRoutes = require('./routes/books')
// const authorsRoutes = require('./routes/authors')
// server.use('/books', booksRoutes)
// server.use('/authors', authorsRoutes)

server.get('/', (req, res) => res.send('Telegraph'))

module.exports = server