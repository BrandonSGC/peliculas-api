import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';

export const Usuario = sequelize.define('Usuario', {
<<<<<<< HEAD
    usuarioID: {
        type: DataTypes.INTEGER,
        autoncrement: true,
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
    tableName: 'Usuarios',
});
=======
  usuarioID: {
    type: DataTypes.INTEGER,
    autoncrement: true,
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
  }
}, {
  timestamps: false,
  tableName: 'Usuarios'
});
>>>>>>> 19523a35598c8c28e97e67caf166ea4f7f35f994
