import Sequelize from "sequelize";


export const sequelize = new Sequelize("proyectoprogv", "root", "root", {
    host: "localhost", 
    dialect: "mysql",
});

//                               **Bryan Connection**
// export const sequelize = new Sequelize("ProyectoProgV", "root", "jesus261999", {
//     host: "localhost",
//     dialect: "mysql",
// }); 