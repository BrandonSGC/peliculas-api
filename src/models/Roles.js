import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Rol = sequelize.define(
  "Rol",
  {
    rolID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Roles",
  }
);
