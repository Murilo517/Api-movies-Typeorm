import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const compareName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieData = req.body;
   
  if(!movieData.name){
    return next()
  }

  const findMovieName: any = await movieRepository.findOneBy({
    name: movieData.name,
  });

  if (findMovieName) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

export default compareName;
