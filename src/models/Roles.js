import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';

export const Roles = sequelize.define('Roles', {
  rolID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

// Export the Roles model
//export default Roles;
