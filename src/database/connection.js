import Sequelize from "sequelize";

// Configura la conexión a MySQL
export const sequelize = new Sequelize("proyectoprogv", "root", "root", {
    host: "localhost", 
    dialect: "mysql",
});