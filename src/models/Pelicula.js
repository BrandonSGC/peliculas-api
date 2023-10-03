import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';

export const Pelicula = sequelize.define('Pelicula', {
  peliculaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoncrement: true
  },
  nombre: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  resena: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  calificacionID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  poster: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  timestamps: false,
});
