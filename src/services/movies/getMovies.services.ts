import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { iPagination } from "../../interfaces/movies.interfaces";
import { returnAllMovies } from "../../schemas/movies.schemas";

const getMoviesService = async (
  page: number,
  perPage: number,
  orderParam: any,
  sort: any
): Promise<iPagination> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const perPageResult = perPage > 5 || perPage <= 0 || isNaN(perPage)?  5: Number(perPage)

  const pageResult = page <= 0 || isNaN(page)? 1 : Number(page)
  
  const sortMovie = sort != "price" && sort != "duration"? "id" : sort
   
  const orderMovie = orderParam && sort? orderParam : 'asc'


  const findMovies: Movie[] = await movieRepository.find({
    take: perPageResult,
    skip: perPageResult * (pageResult - 1),
    order: {
      [sortMovie]: orderMovie,
    },
  });

  const baseURL: string = `http://localhost:3000/movies`;

  let count: number = await movieRepository.count();

  let numberOfPages: number = count / perPageResult;

  let prevPage: any = `${baseURL}?page=${pageResult - 1}&perPage=${perPageResult}`;
  if (pageResult - 1 <= 0) {
    prevPage = null;
  }

  let nextPage: any =
    numberOfPages <= pageResult
      ? null
      : `${baseURL}?page=${pageResult + 1}&perPage=${perPageResult}`;

  const movies: Movie[] = returnAllMovies.parse(findMovies);

  const pagination: iPagination = {
    prevPage,
    nextPage,
    count,
    data: movies,
  };

  return pagination;
};

export { getMoviesService };
