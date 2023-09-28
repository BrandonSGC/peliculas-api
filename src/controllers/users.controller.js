import { Usuario } from "../models/Usuario.js";

export const getUsers = async (req, res) => {
  try {
    // Get all users.
    const users = await Usuario.findAll();
    res.json(users);
  } catch (error) {
    console.log(`An error has ocurred while getting users: ${error}`);
    res.status(500).json({message: error.message});
  }
};

export const createUser = async (req, res) => {
  try {
    // Get body data.
    const { nombreUsuario, nombre, apellidos, email, contrasena, rolID } =
      req.body;

    // Create user.
    const newUser = await Usuario.create({
      nombreUsuario,
      nombre,
      apellidos,
      email,
      contrasena,
      rolID,
    });

    //console.log(newUser);

    res.status(201).json({ message: "Usuario creado exitósamente!" });
  } catch (error) {
    console.log(`An error has ocurred while creating an user: ${error.message}`);
    res.status(500).json({message: error.message});
  }
};

export const updateUser = async (req, res) => {
  try {
    // Get Data
    const { nombreUsuario } = req.params;
    const { nombre, apellidos, email, contrasena, rolID } = req.body;

    console.log(nombreUsuario, nombre);
    
    // Find and assign user to "user" variable.
    const user = await Usuario.findByPk(nombreUsuario);

    // Update data.
    user.nombre = nombre;
    user.apellidos = apellidos;
    user.email = email;
    user.contrasena = contrasena;
    user.rolID = rolID;
    
    // Save data updated in DB.
    await user.save();

    res.status(201).json({ message: "Usuario actualizado exitósamente!" });
  } catch (error) {
    console.log(`An error has ocurred while creating an user: ${error.message}`);
    res.status(500).json({message: error.message});
  }
};


export const deleteUser = async (req, res) => {
  try {
    // Get id from the url parameters.
    const { nombreUsuario } = req.params;
    
    // Delete user.
    await Usuario.destroy({
      where: {
        nombreUsuario: nombreUsuario
      }
    });
    res.json({message: 'Usuario eliminado exitósamente!'});
  } catch (error) {
    console.log(`An error has ocurred while getting users: ${error}`);
    res.status(500).json({message: error.message});
  }
};