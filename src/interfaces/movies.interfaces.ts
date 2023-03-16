import {
  movieSchema,
  returnAllMovies,
  returnMovieSchema,
} from "../schemas/movies.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";
import { Repository } from 'typeorm';
import { Movie } from '../entities';

type movieType = z.infer<typeof movieSchema>;

type movieReturnType = z.infer<typeof returnMovieSchema>;

type allMoviesType = z.infer<typeof returnAllMovies>;

type updateMovieType = DeepPartial<movieType>;

interface iPagination {
  prevPage: string;
  nextPage: string;
  count: number;
  data: any;
}

type iMovieCreate = z.infer<typeof movieSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

export {
  movieType,
  movieReturnType,
  allMoviesType,
  updateMovieType,
  iPagination,
  iMovieCreate,
  iMovieUpdate,
  iMovieRepo
};
