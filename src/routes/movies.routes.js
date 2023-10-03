import { Router } from 'express';
import { createMovie, getMovies } from '../controllers/movies.controller.js';

const router = Router();

router.get('/movies', getMovies);
router.post('/movies', createMovie);

export default router;