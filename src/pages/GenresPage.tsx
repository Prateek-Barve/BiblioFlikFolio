import { useEffect, useState } from "react";
import { getGenres } from "../api/genresApi";
import type { Genre } from "../types/genre";
import "./genrepage.css";

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  return (
  <div className="genres-page">
    <div className="genres-header">
      <h2 className="genres-title">The Spectrum of Stories</h2>
    </div>

    <div className="genres-grid">
      {genres.map((genre) => (
        <div key={genre.id} className="genre-card">
          <h3 className="genre-name">{genre.name}</h3>
          <span
  className={`genre-category ${
    genre.category === "Book" ? "category-book" : "category-screen"
  }`}
>
  {genre.category}
</span>
        </div>
      ))}
    </div>
  </div>
);
}