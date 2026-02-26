import api from "./axios";
import type { PaginatedResponse } from "../types/pagination";
import type { Book } from "../types/book";

export const getBooks = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Book>> => {
  const response = await api.get("/books", {
    params: {
      page,
      pageSize,
      sortOrder: "desc",
    },
  });

  return response.data;
};