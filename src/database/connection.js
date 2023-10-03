import Sequelize from "sequelize";

// Connecting to the SQL Server.
// export const sequelize = new Sequilize("ProyectoProgV", "sa", "root", {
//   host: "localhost",
//   dialect: "mssql"
// });

// Connecting to the MySQL.
export const sequelize = new Sequelize("proyectoprogv", "root", "root", {
  host: "localhost", // Cambia a la dirección del servidor MySQL si es diferente
  dialect: "mysql",
});