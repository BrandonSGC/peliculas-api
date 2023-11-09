import { Usuario } from "../models/Usuarios.js";
import { sequelize } from '../database/connection.js';
import jwt from 'jsonwebtoken';

export const getUsers = async(req, res) => {
    try {
        // Obtener todos los usuarios.
        const users = await Usuario.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.log(`Ha ocurrido un error al obtener los usuarios: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

export const getUserByUsername = async(req, res) => {
    const { username } = req.params;
    try {
        const user = await Usuario.findOne({ where: { nombreUsuario: username } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(`Ha ocurrido un error al obtener el usuario: ${error}`);
        res.status(500).json({ message: error.message });
    }
};


export const createUser = async(req, res) => {
    try {
        const { nombreUsuario, nombre, apellidos, email, contrasena } = req.body;

        // Validar que no haya uno con el mismo nombre de usuario.
        const existingUser = await Usuario.findOne({ where: { nombreUsuario } });

        if (existingUser) {
            res.status(409).json({ message: 'El nombre de usuario ya está en uso.' });
            return;
        }

        await Usuario.create({
            nombreUsuario,
            nombre,
            apellidos,
            email,
            contrasena,
            activo: 1,
        });

        res.status(201).json({ message: "Usuario creado exitosamente!" });
    } catch (error) {
        console.log(`Ha ocurrido un error al crear un usuario: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async(req, res) => {
    try {
        // Obtener datos.
        const { id } = req.params;
        const { nombreUsuario, nombre, apellidos, email, contrasena, activo } = req.body;

        const user = await Usuario.findByPk(id);

        if (!user) {
            res.status(404).json({ message: 'El usuario a modificar no existe.' });
            return;
        }

        // Actualizar datos.
        user.nombreUsuario = nombreUsuario;
        user.nombre = nombre;
        user.apellidos = apellidos;
        user.email = email;
        user.contrasena = contrasena;
        user.activo = activo;

        // Guardar datos actualizados en la base de datos.
        await user.save();
        res.status(200).json({ message: "Usuario actualizado exitosamente!" });

    } catch (error) {
        console.log(`Ha ocurrido un error al actualizar un usuario: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async(req, res) => {
    try {
        // Obtener ID de los parámetros de la URL.
        const { id } = req.params;

        const user = await Usuario.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'El usuario a eliminar no existe.' });
            return;
        }

        // Por corregir:
        /* Validar si ha hecho comentarios, si los ha hecho 
        eliminar comentarios para posteriormente poder eliminar
        el usuario. */

        // Eliminar usuario.
        await Usuario.destroy({
            where: {
                usuarioID: id
            }
        });
        res.status(200).json({ message: 'Usuario eliminado exitosamente!' });
    } catch (error) {
        console.log(`Ha ocurrido un error al eliminar un usuario: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

// Función para activar / desactivar usuario
export const setUserStatus = async(req, res) => {
    try {
        const { id, status } = req.params;

        const user = await Usuario.findByPk(id);

        if (!user) {
            res.status(404).json({ message: 'El usuario a modificar el estado no existe.' });
            return;
        }

        user.activo = status;

        user.save();

        res.status(200).json({ message: 'Estado del usuario cambiado exitosamente!' });
    } catch (error) {
        console.log(`Ha ocurrido un error al cambiar el estado del usuario: ${error}`);
        res.status(500).json({ message: error.message })
    }
};

// Función para generar un token
export function generateToken(userId) {
    const secretKey = '7###saasdyth&^$%'; // Reemplaza con tu clave secreta
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '5m' }); // Personaliza el tiempo de expiración según tus necesidades
    return token;
}


// Método privado para validar las credenciales
const validateCredentials = async(username, password, failedAttempts) => {
    try {
        const results = await sequelize.query('CALL LoginUsuario(?, ?)', {
            replacements: [username, password],
            type: sequelize.QueryTypes.RAW,
        });

        // Verificar si el valor de la columna 1 es igual a 1
        const p_resultado = results[0]['1'];

        if (p_resultado === 1) {
            // Inicio de sesión exitoso y usuario activo
            return true;
        } else {
            // Inicio de sesión incorrecto o usuario inactivo

            // Incrementar el contador de intentos fallidos localmente
            const updatedAttempts = failedAttempts + 1;

            if (updatedAttempts >= 3) {
                // Si hay tres intentos fallidos, informar a la API o tomar la acción necesaria
                // Puedes enviar una solicitud PUT a la API para actualizar el estado del usuario
                // fetch('http://localhost:3000/updateFailedAttempts', {
                //     method: 'PUT',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ username }),
                // })
                // .then(response => response.json())
                // .then(data => console.log(data.message))
                // .catch(error => console.error('Error al informar intentos fallidos:', error));

                console.log('Has alcanzado tres intentos fallidos. Usuario inactivo.');
            }

            return false;
        }
    } catch (error) {
        console.error('Error al validar credenciales:', error);
        return false;
    }
};



export const loginUser = async(req, res) => {
    const { username, password } = req.body;
    let failedAttempts = 0;

    try {
        // Llamar al método privado para validar las credenciales
        const isValidCredentials = await validateCredentials(username, password, failedAttempts);

        if (isValidCredentials) {
            // Inicio de sesión exitoso y usuario activo
            const token = generateToken(); // Genera el token
            res.json({ token });
        } else {
            // Inicio de sesión incorrecto o usuario inactivo
            // Incrementar el contador de intentos fallidos
            failedAttempts++;

            if (failedAttempts >= 3) {
                // Cambiar el estado del usuario a inactivo (0)
                const user = await Usuario.findOne({ where: { nombreUsuario: username } });

                if (user) {
                    await user.update({ activo: 0 });
                    failedAttempts = 0; // Restablecer el contador después de cambiar el estado
                }
            }

            res.status(401).json({ message: 'Credenciales inválidas o usuario inactivo' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};



export const updateFailedAttempts = async(req, res) => {
    const { username } = req.body;

    try {
        const user = await Usuario.findOne({ where: { nombreUsuario: username } });

        if (user) {
            // Incrementar el contador de intentos fallidos
            await user.increment('intentosFallidos');

            // Obtener el nuevo valor del contador
            const intentosFallidos = user.getDataValue('intentosFallidos');

            if (intentosFallidos >= 3) {
                // Cambiar el estado del usuario a inactivo (0) después de tres intentos fallidos
                await user.update({ activo: 0, intentosFallidos: 0 });
            }

            res.status(200).json({ message: 'Intentos fallidos actualizados exitosamente.' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar intentos fallidos:', error);
        res.status(500).json({ message: 'Error al actualizar intentos fallidos' });
    }
};