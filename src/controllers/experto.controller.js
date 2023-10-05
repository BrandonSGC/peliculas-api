import { Experto } from "../models/Experto.js";

export const getExpertos = async (req, res) => {
  try {
    const expertos = await Experto.findAll();
    res.status(200).json(expertos);
  } catch (error) {
    console.log(`Ocurrió un error al obtener los expertos: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

export const createExperto = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevoExperto = await Experto.create({
      nombre,
    });

    res.status(201).json({ message: "Experto creado exitosamente!", experto: nuevoExperto });
  } catch (error) {
    console.log(`Ocurrió un error al crear un experto: ${error.message}`);

    res.status(500).json({ message: error.message });
  }
};

export const updateExperto = async (req, res) => {
  try {
    const { id } = req.params;

    const { nombre } = req.body;

    const experto = await Experto.findByPk(id);

    experto.nombre = nombre;

    await experto.save();

    res.json({ message: "Experto actualizado exitosamente!" });
  } catch (error) {
    console.log(`Ocurrió un error al actualizar un experto: ${error.message}`);

    res.status(500).json({ message: error.message });
  }
};

export const deleteExperto = async (req, res) => {
  try {
    const { id } = req.params;

    await Experto.destroy({
      where: {
        ExpertoID: id,
      },
    });

    res.json({ message: "Experto eliminado exitosamente!" });
  } catch (error) {
    console.log(`Ocurrió un error al eliminar un experto: ${error.message}`);

    res.status(500).json({ message: error.message });
  }
};
