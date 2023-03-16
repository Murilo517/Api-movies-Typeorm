import { movieType } from "../../interfaces/movies.interfaces";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

const createMovieService = async (
  movieData: movieType
): Promise<Movie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie); 
 

  const movie : Movie = movieRepository.create(movieData);

  await movieRepository.save(movie);
  
  return movie;
};

export default createMovieService;
