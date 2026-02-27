import { useEffect, useState } from "react";
import { getMovies } from "../api/moviesApi";
import type { Movie } from "../types/movie";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import type { Genre } from "../types/genre";
import { getGenres } from "../api/genresApi";
import GenreFilter from "../components/GenreFilter";
import StatusFilter from "../components/StatusFilter";
import EmptyState from "../components/EmptyState";
import "./moviepage.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredMovies = movies
  .filter(b => selectedGenre ? b.genres.includes(selectedGenre) : true)
  .filter(b => selectedStatus ? b.status === selectedStatus : true);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const result = await getMovies(page, pageSize);

      setMovies(result.data);
      setTotalPages(Math.ceil(result.totalRecords / pageSize));
      setError(null);
    } catch {
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };

    fetchGenres();
  }, []);

  return (
  <div className="movies-page">
    <div className="movies-header">
      <div className="quote-block">
      <h2 className="movies-title">"Mankind was born on Earth. It was never meant to die here."</h2>
      <h2 className="movies-title-2">- Professor Brand (Intersteller)</h2>
      </div>
    </div>

    <div className="movies-filters">
      <GenreFilter
        genres={genres}
        selected={selectedGenre}
        onChange={setSelectedGenre}
      />

      <StatusFilter
        selected={selectedStatus}
        onChange={setSelectedStatus}
        data={"movies"}
      />
    </div>

    {loading && <div className="movies-state">Loading movies...</div>}
    {error && <div className="movies-error">{error}</div>}

    {!loading && (
      <div className="movies-grid">
        {filteredMovies.length === 0 ? (
          <EmptyState message="Try changing filters." />
        ) : (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-card-top">
                <h3 className="movie-title">{movie.title}</h3>
                <StatusBadge status={movie.status} date="movies" />
              </div>

              <div className="movie-genres">
                {movie.genres.map((genre) => (
                  <span key={genre} className="genre-pill">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    )}

    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  </div>
);
}