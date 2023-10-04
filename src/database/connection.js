import Sequelize from "sequelize";

// Configura la conexión a MySQL
export const sequelize = new Sequelize("proyectoprogv", "root", "root", {
<<<<<<< HEAD
    host: "localhost", // Cambia a la dirección del servidor MySQL si es diferente
    dialect: "mysql",
});

//                                **Bryan Connection**
//export const sequelize = new Sequelize("ProyectoProgV", "root", "jesus261999", {
//    host: "localhost", // Cambia a la dirección del servidor MySQL si es diferente
//    dialect: "mysql",
//});
=======
    host: "localhost", 
    dialect: "mysql",
});
>>>>>>> 19523a35598c8c28e97e67caf166ea4f7f35f994
