import { Calificacion } from "../models/Calificacion.js";

export const getCalificadores = async (req, res) => {
  try {
    const calificadores = await Calificacion.findAll();
    res.status(200).json(calificadores);
  } catch (error) {
    console.log(`Ocurrió un error al obtener los calificadores: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const createCalificacion = async (req, res) => {
  try {
    const { expertoID, calificacion } = req.body;
    await Calificacion.create({
      expertoID,
      calificacion,
    });

    res.status(201).json({ message: "Calificación creada exitosamente!" });
  } catch (error) {
    console.log(`Ocurrió un error al crear una calificación: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const updateCalificacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { expertoID, calificacion } = req.body;
    const calif = await Calificacion.findByPk(id);
    
    if (calif) {
      calif.expertoID = expertoID;
      calif.calificacion = calificacion;
      await calif.save();
      res.json({ message: "Calificación actualizada exitosamente!" });
    } else {
      res.status(404).json({ message: "Calificación no encontrada." });
    }
  } catch (error) {
    console.log(`Ocurrió un error al actualizar una calificación: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCalificacion = async (req, res) => {
  try {
    const { id } = req.params;
    const calif = await Calificacion.findByPk(id);
    
    if (calif) {
      await calif.destroy();
      res.status(200).json({ message: "Calificación eliminada exitosamente!" });
    } else {
      res.status(404).json({ message: "Calificación no encontrada." });
    }
  } catch (error) {
    console.log(`Ocurrió un error al eliminar una calificación: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
