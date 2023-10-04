import { Router } from 'express';
import { createMovie, getMovies, updateMovie, deleteMovie, createComment } from '../controllers/movies.controller.js';

const router = Router();

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

router.post('/movies/comments', createComment);

export default router;