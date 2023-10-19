import Sequelize from "sequelize";

// Configura la conexión a MySQL
// export const sequelize = new Sequelize("proyectoprogv", "root", "root", {
//     host: "localhost", // Cambia a la dirección del servidor MySQL si es diferente
//     dialect: "mysql",
// });

//                               **Bryan Connection**
export const sequelize = new Sequelize("ProyectoProgV", "root", "jesus261999", {
    host: "localhost", // Cambia a la dirección del servidor MySQL si es diferente
    dialect: "mysql",
});