import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';
import { Roles } from './Roles.js';

export const Usuario = sequelize.define('Usuario', {
  usuarioID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    primaryKey: true,
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
  }
}, {
  timestamps: false,
});
