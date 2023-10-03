import express from 'express';
import userRoutes from './routes/users.routes.js';
import moviesRoutes from './routes/movies.routes.js'

const app = express();

// Middlewares
app.use(express.json());

app.use(userRoutes);
app.use(moviesRoutes);

export default app;