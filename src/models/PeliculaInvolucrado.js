import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';

export const PeliculaInvolucrado = sequelize.define('PeliculaInvolucrado', {
  peliculaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  involucradoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  rolID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ordenAparicion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'PeliculaInvolucrado',
});
