const express = require("express");
const route = express();

const books = require("./controllers/livros");
const autores = require("./controllers/autores");

route.get("/livros", books.listBooks);
route.get("/livros/busca", books.listBooksEditora);
route.get("/livros/:id", books.detailBook);
route.post("/livros", books.registerBook);
route.put("/livros/:id", books.updateBook);
route.delete("/livros/:id", books.deleteBook);

route.get("/livros", autores.listAutores);
route.get("/livros/:id", autores.detailAutor);
route.post("/livros", autores.registerAutor);
route.put("/livros/:id", autores.updateAutor);
route.delete("/livros/:id", autores.deleteAutor);

module.exports = route;
