import { Router } from "express";
import { createMoviesController, deleteMoviesController, getMoviesController, updateMoviesController } from "../controllers/movies.controllers";
import compareName from "../middlewares/compareName.middleware";
import movieExists from "../middlewares/movieExist.middleware";
import { validateMovieData } from "../middlewares/validateMovie.middleware";
import { movieSchema, updateMovieSchema } from "../schemas/movies.schemas";

const moviesRoutes : Router = Router()

moviesRoutes.post('', validateMovieData(movieSchema),compareName, createMoviesController)
moviesRoutes.get('',getMoviesController)
moviesRoutes.patch('/:id',validateMovieData(updateMovieSchema),movieExists,compareName,updateMoviesController)
moviesRoutes.delete('/:id',movieExists,deleteMoviesController)

export default moviesRoutes