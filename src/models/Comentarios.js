import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Comentario = sequelize.define(
  "Comentario",
  {
    comentarioID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    peliculaID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuarioID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    comentarioPadreID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'Comentarios'
  }
);
