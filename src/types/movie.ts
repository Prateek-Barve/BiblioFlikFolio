export type MovieStatus =
  | "NotStarted"
  | "Completed";

export interface Movie {
  id: number;
  title: string;
  status: MovieStatus;
  createdAt: string;
  genres: string[];
}