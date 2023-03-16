import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import {
  movieReturnType,
  updateMovieType,
} from "../../interfaces/movies.interfaces";
import { returnMovieSchema } from "../../schemas/movies.schemas";

const updateMovieService = async (
  movieData: updateMovieType,
  movieId: number
): Promise<movieReturnType> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieOldData: Movie | null = await movieRepository.findOneBy({
    id: movieId,
  });

  const movie: Movie = movieRepository.create({
    ...movieOldData,
    ...movieData,
  });

  await movieRepository.save(movie);

  const updatedMovie: movieReturnType = returnMovieSchema.parse(movie);

  return updatedMovie;
};

export { updateMovieService };
