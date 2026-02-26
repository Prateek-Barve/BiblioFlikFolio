export type SeriesStatus =
  | "NotStarted"
  | "Completed";

export interface Series {
  id: number;
  title: string;
  status: SeriesStatus;
  createdAt: string;
  genres: string[];
}