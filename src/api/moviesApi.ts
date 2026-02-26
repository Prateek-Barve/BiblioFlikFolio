import api from "./axios";
import type { PaginatedResponse } from "../types/pagination";
import type { Movie } from "../types/movie";

export const getMovies = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Movie>> => {
  const response = await api.get("/movies", {
    params: {
      page,
      pageSize,
      sortOrder: "desc",
    },
  });

  return response.data;
};