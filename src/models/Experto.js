import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Experto = sequelize.define(
  "experto", 
  {
    ExpertoID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName:'Experto'
  }
);
