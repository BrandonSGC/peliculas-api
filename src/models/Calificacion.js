import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Calificacion = sequelize.define(
  "Calificaciones", 
  {
    calificacionID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    expertoID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName:'Calificaciones'
  }
);
