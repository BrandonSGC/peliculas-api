import express from 'express';
import userRoutes from './routes/users.routes.js';
import calificadoresRoutes from "./routes/calificadores.routes.js";
import expertosRoutes from "./routes/expertos.routes.js"; 

const app = express();

// Middlewares
app.use(express.json());

app.use(userRoutes);
app.use(calificadoresRoutes);
app.use(expertosRoutes); 

export default app;
