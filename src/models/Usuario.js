import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';
import { Roles } from './Roles.js';

export const Usuario = sequelize.define('Usuario', {
  nombreUsuario: {
    type: DataTypes.STRING,
    primaryKey: true,
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
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  rolID: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
});

// Define the association
Usuario.belongsTo(Roles, {
  foreignKey: 'rolID', // Nombre del campo en la tabla Usuario que hace referencia a Roles
  targetKey: 'rolID', // Nombre del campo en la tabla Roles que se referencia
});
