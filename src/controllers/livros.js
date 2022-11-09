const db = require("../config/dbConnect");
const livros = require("../models/LIvro");

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {});

const listBooks = async (req, res) => {
  try {
    const allBooks = await livros.find().populate("autor");
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const registerBook = async (req, res) => {
  try {
    const livro = new livros(req.body);
    const cadastrolivro = await livro.save();

    return res.status(200).json("livro cadastrado com sucesso.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;

  try {
    const searchBook = await livros.findByIdAndUpdate(id, { $set: req.body });
    return res.status(200).json("livro foi atualizado com sucesso.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detailBook = async (req, res) => {
  const { id } = req.params;

  try {
    const livro = await livros.findById(id).populate("autor", "nome");
    return res.status(200).json(livro);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const livro = await livros.findByIdAndDelete(id);
    return res.status(200).json("livro foi deletado com sucesso.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const listBooksEditora = async (req, res) => {
  const { editora } = req.query;

  try {
    const allbooks = await livros.find({ editora: editora }, {});
    return res.status(200).json(allbooks);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registerBook,
  listBooks,
  detailBook,
  updateBook,
  deleteBook,
  listBooksEditora,
};
