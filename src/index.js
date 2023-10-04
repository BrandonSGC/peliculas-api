import app from './app.js';
<<<<<<< HEAD
import { sequelize } from './database/connection.js';
=======
import {sequelize} from './database/connection.js';
>>>>>>> 19523a35598c8c28e97e67caf166ea4f7f35f994
import './models/Usuarios.js';

const PORT = process.env.PORT || 3000;

async function main() {
    try {

        // Handle DB.
        await sequelize.sync( /*{force: true}*/ );

        // Server.
        app.listen(PORT);
        console.log(`Server running at http://localhost:${PORT}`);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();