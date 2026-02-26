import api from "./axios";
import type { PaginatedResponse } from "../types/pagination";
import type { Series } from "../types/series";

export const getSeries = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Series>> => {
  const response = await api.get("/series", {
    params: {
      page,
      pageSize,
      sortOrder: "desc",
    },
  });

  return response.data;
};