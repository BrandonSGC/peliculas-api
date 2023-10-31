import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users.routes.js';
import calificadoresRoutes from "./routes/calificadores.routes.js";
import expertosRoutes from "./routes/expertos.routes.js"; 
import moviesRoutes from './routes/movies.routes.js'
import involucradoRoutes from './routes/involucrado.routes.js';
import tipoInvolucrados from './routes/roles.routes.js'

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(calificadoresRoutes);
app.use(expertosRoutes); 
app.use(moviesRoutes);
app.use(involucradoRoutes);
app.use(tipoInvolucrados);


export default app;
