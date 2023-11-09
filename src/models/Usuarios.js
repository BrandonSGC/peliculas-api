import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';

export const Usuario = sequelize.define('Usuario', {
    usuarioID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreUsuario: {
        type: DataTypes.STRING(30),
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    intentosFallidos: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    timestamps: false,
    tableName: 'Usuarios'
});