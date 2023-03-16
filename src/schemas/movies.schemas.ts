import { z } from "zod";

const movieSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().optional().nullable(),
  duration: z.number().positive({
    message: 'Number must be greater than 0'
  }),
  price: z.number().int({message:'Expected integer, received float'}),
});

const returnMovieSchema = movieSchema.extend({
  id: z.number(),
});

const returnAllMovies = returnMovieSchema.array();

const updateMovieSchema = movieSchema.partial();

export { movieSchema, returnMovieSchema, returnAllMovies, updateMovieSchema };
