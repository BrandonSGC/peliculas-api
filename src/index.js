import app from './app.js';
import {sequelize} from './database/connection.js';
import './models/Roles.js';
import './models/Usuario.js';


const PORT = process.env.PORT || 3000;

async function main() {
  try {
    // Testing the connection.
    // await sequelize.authenticate();
    // console.log('Connection has been established successfully.');

    // Handle the DB.
    await sequelize.sync({force: true}/**/);
    app.listen(PORT);
    console.log(`Server running at http://localhost:${PORT}`);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();