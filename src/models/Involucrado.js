import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';

export const Involucrado = sequelize.define(
  'Involucrado',
  {
    involucradoID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    paginaWeb: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: 'Involucrado',
  }
);

export default Involucrado;
