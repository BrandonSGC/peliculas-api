import Involucrado from "../models/Involucrado.js";

export const getInvolucrados = async (req, res) => {
  try {
    const involucrados = await Involucrado.findAll();

    res.status(200).json(involucrados);
  } catch (error) {
    console.log(
      `Ocurrió un error al obtener los tipos de involucrados: ${error}`
    );

    res.status(500).json({ message: error.message });
  }
};

export const createInvolucrado = async (req, res) => {
  try {
    const { nombre, paginaWeb, facebook, instagram, twitter } = req.body;

    const nuevoInvolucrado = await Involucrado.create({
      nombre,
      paginaWeb,
      facebook,
      instagram,
      twitter,
    });

    res.status(201).json({
        message: "Tipo de involucrado creado exitosamente!",
        involucrado: nuevoInvolucrado,
      });
  } catch (error) {
    console.log(
      `Ocurrió un error al crear un tipo de involucrado: ${error.message}`
    );
    res.status(500).json({ message: error.message });
  }
};

export const updateInvolucrado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, paginaWeb, facebook, instagram, twitter } = req.body;
    const involucrado = await Involucrado.findByPk(id);

    if (involucrado) {
      involucrado.nombre = nombre;
      involucrado.paginaWeb = paginaWeb;
      involucrado.facebook = facebook;
      involucrado.instagram = instagram;
      involucrado.twitter = twitter;

      await involucrado.save();

      res.status(200).json({ message: "Tipo de involucrado actualizado exitosamente!" });
    } else {
      res.status(404).json({ message: "Tipo de involucrado no encontrado." });
    }
  } catch (error) {
    console.log(
      `Ocurrió un error al actualizar un tipo de involucrado: ${error.message}`
    );

    res.status(500).json({ message: error.message });
  }
};

export const deleteInvolucrado = async (req, res) => {
  try {
    const { id } = req.params;

    const involucrado = await Involucrado.findByPk(id);

    if (involucrado) {
      await involucrado.destroy();
      res.status(200).json({ message: "Tipo de involucrado eliminado exitosamente!" });
    } else {
      res.status(404).json({ message: "Tipo de involucrado no encontrado." });
    }
  } catch (error) {
    console.log(
      `Ocurrió un error al eliminar un tipo de involucrado: ${error.message}`
    );

    res.status(500).json({ message: error.message });
  }
};
