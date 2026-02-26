export type BookStatus =
  | "NotStarted"
  | "Reading"
  | "Completed";

export interface Book {
  id: number;
  title: string;
  author: string;
  status: BookStatus;
  createdAt: string;
  genres: string[];
}