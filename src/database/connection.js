import Sequilize from "sequelize";

// Connecting to the database.
export const sequelize = new Sequilize("ProyectoProgV", "sa", "root", {
  host: "localhost",
  dialect: "mssql"
});
