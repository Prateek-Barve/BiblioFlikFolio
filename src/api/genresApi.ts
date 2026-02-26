import api from "./axios";
import type { Genre } from "../types/genre";

export const getGenres = async (): Promise<Genre[]> => {
  const response = await api.get("/genres");
  return response.data;
};