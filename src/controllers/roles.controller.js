import { Rol } from "../models/Roles.js";

export const createRol = async (req, res) => {
  try {
    const { descripcion } = req.body;

    const existingRol = await Rol.findOne({ where: { descripcion } });

    if (existingRol) {
      res.status(409).json({ message: "El tipo de involucrado ya existe." });
      return;
    }

    const rol = await Rol.create({
      descripcion,
    });

    res
      .status(201)
      .json({ message: "Tipo de involucrado creado exitosamente!" });
  } catch (error) {
    console.log(
      `Ha ocurrido un error al crear el Tipo de Involucrado: ${error.message}`
    );
    res.status(500).json({ message: error.message });
  }
};

export const updateRol = async (req, res) => {
  try {
    // Obtener datos.
    const { id } = req.params;
    const { descripcion } = req.body;

    const rol = await Rol.findByPk(id);

    if (!rol) {
      res
        .status(404)
        .json({ message: "El Tipo de Involucrado a modificar no existe." });
      return;
    }

    rol.descripcion = descripcion;

    await rol.save();
    res
      .status(200)
      .json({
        message: "Tipo de Involucrado actualizado exitosamente!",
        rol: rol,
      });
  } catch (error) {
    console.log(
      `Ha ocurrido un error al actualizar el Tipo de Involucrado: ${error.message}`
    );
    res.status(500).json({ message: error.message });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findByPk(id);
    if (!rol) {
      res
        .status(404)
        .json({ message: "Tipo de Involucrado a eliminar no existe." });
      return;
    }

    await Rol.destroy({
      where: {
        rolID: id,
      },
    });
    res
      .status(200)
      .json({
        message: "Tipo de Involucrado eliminado exitosamente!",
        rol: rol,
      });
  } catch (error) {
    console.log(`Ha ocurrido un error al eliminar un Tipo de Involucrado: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const { descripcion } = req.query;

    if (descripcion) {
      const roles = await Rol.findAll({
        where: {
          descripcion: descripcion,
        },
      });
      res.status(200).json(roles);
    } else {
      const roles = await Rol.findAll();
      res.status(200).json(roles);
    }
  } catch (error) {
    console.log(`Ha ocurrido un error al obtener los Tipos de Involucrados: ${error}`);
    res.status(500).json({ message: error.message });
  }
};
