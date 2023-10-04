import { Router } from 'express';
import { createMovie, getMovies, updateMovie, deleteMovie, createComment, deleteComment, updateComment } from '../controllers/movies.controller.js';

const router = Router();

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

router.post('/movies/comments', createComment);
router.put('/movies/comments/:id', updateComment);
router.delete('/movies/comments/:id', deleteComment);

export default router;