import { Usuario } from "../models/Usuarios.js";

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
    const { nombreUsuario, nombre, apellidos, email, contrasena, activo } =
      req.body;

    // Create user.
    await Usuario.create({
      nombreUsuario,
      nombre,
      apellidos,
      email,
      contrasena,
      activo,
    });

    res.status(201).json({ message: "Usuario creado exitósamente!" });
  } catch (error) {
    console.log(`An error has ocurred while creating an user: ${error.message}`);
    res.status(500).json({message: error.message});
  }
};

export const updateUser = async (req, res) => {
  try {
    // Get Data
    const { id } = req.params;
    const { nombreUsuario, nombre, apellidos, email, contrasena, activo } = req.body;
    
    // Find and assign user to "user" variable.
    const user = await Usuario.findByPk(id);

    // Update data.
    user.nombreUsuario = nombreUsuario;
    user.nombre = nombre;
    user.apellidos = apellidos;
    user.email = email;
    user.contrasena = contrasena;
    user.activo = activo;
    
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
    const { id } = req.params;
    
    // Delete user.
    await Usuario.destroy({
      where: {
        usuarioID: id
      }
    });
    res.json({message: 'Usuario eliminado exitósamente!'});
  } catch (error) {
    console.log(`An error has ocurred while getting users: ${error}`);
    res.status(500).json({message: error.message});
  }
};


// Function to activate / disactivate user
export const setUserStatus = async (req, res) => {
  try {
    const { id, status } = req.params;

    const user = await Usuario.findByPk(id);
    user.activo = status;
    
    user.save();

    res.json({message: 'Estado del usuario cambiado exitósamente!'});
  } catch (error) {
    console.log(`An error has ocurred while getting users: ${error}`);
    res.status(500).json({message: error.message})
  }
};