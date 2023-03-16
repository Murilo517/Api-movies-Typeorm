import { Request, Response } from "express";
import { movieType } from "../interfaces/movies.interfaces";
import createMovieService from "../services/movies/createMovies.services";
import { deleteMovieService } from "../services/movies/deleteMovies.services";
import { getMoviesService } from "../services/movies/getMovies.services";
import { updateMovieService } from "../services/movies/updateMovies.services";

const createMoviesController = async (req: Request, res: Response) => {
  const movieData: movieType = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

const getMoviesController = async (req: Request, res: Response) => {
  let page = Number(req.query.page);
  let perPage = Number(req.query.perPage);

  let order: any = req.query.order;

  let sort : any = req.query.sort

  const movies = await getMoviesService(page, perPage, order,sort);

  return res.status(200).json(movies);
};

const updateMoviesController = async (req: Request, res: Response) => {
  const movieId = parseInt(req.params.id);
  const movieData = req.body;

  const updatedMovie = await updateMovieService(movieData, movieId);

  return res.json(updatedMovie);
};

const deleteMoviesController = async (req: Request, res: Response) => {
  await deleteMovieService(parseInt(req.params.id));

  return res.status(204).send();
};

export {
  createMoviesController,
  getMoviesController,
  updateMoviesController,
  deleteMoviesController,
};
