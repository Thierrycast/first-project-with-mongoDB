const db = require("../config/dbConnect");
const autores = require("../models/Autor");

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {});

const listAutores = async (req, res) => {
  try {
    const allBooks = await autores.find();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const registerAutor = async (req, res) => {
  try {
    const autor = new autores(req.body);
    const cadastroautor = await autor.save();

    return res.status(200).json("autor cadastrado com sucesso.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateAutor = async (req, res) => {
  const { id } = req.params;

  try {
    const searchBook = await autores.findByIdAndUpdate(id, { $set: req.body });
    return res.status(200).json("autor foi atualizado com sucesso.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detailAutor = async (req, res) => {
  const { id } = req.params;

  try {
    const autor = await autores.findById(id);
    return res.status(200).json(autor);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteAutor = async (req, res) => {
  const { id } = req.params;

  try {
    const autor = await autores.findByIdAndDelete(id);
    return res.status(200).json("autor foi deletado com sucesso.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  listAutores,
  registerAutor,
  updateAutor,
  detailAutor,
  deleteAutor,
};
