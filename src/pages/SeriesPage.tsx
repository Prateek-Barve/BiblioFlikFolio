import { useEffect, useState } from "react";
import { getSeries } from "../api/seriesApi";
import type { Series } from "../types/series";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import type { Genre } from "../types/genre";
import GenreFilter from "../components/GenreFilter";
import StatusFilter from "../components/StatusFilter";
import { getGenres } from "../api/genresApi";
import EmptyState from "../components/EmptyState";
import "./seriespage.css";

export default function SeriesPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredSeries = series
  .filter(b => selectedGenre ? b.genres.includes(selectedGenre) : true)
  .filter(b => selectedStatus ? b.status === selectedStatus : true);

  const fetchSeries = async () => {
    try {
      setLoading(true);
      const result = await getSeries(page, pageSize);

      setSeries(result.data);
      setTotalPages(Math.ceil(result.totalRecords / pageSize));
      setError(null);
    } catch {
      setError("Failed to load series.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, [page]);
  useEffect(() => {
      const fetchGenres = async () => {
        const data = await getGenres();
        setGenres(data);
      };
  
      fetchGenres();
    }, []);

  return (
  <div className="series-page">
    <div className="series-header">
      <div className="quote-block">
      <h2 className="series-title">"When life gives you lemonade, make lemons. Life will be like, Whaaaat?"</h2>
      <h2 className="series-title-2">(Phil's Osophy)</h2>
      </div>
    </div>

    <div className="series-filters">
      <GenreFilter
        genres={genres}
        selected={selectedGenre}
        onChange={setSelectedGenre}
      />

      <StatusFilter
        selected={selectedStatus}
        onChange={setSelectedStatus}
      />
    </div>

    {loading && <div className="series-state">Loading series...</div>}
    {error && <div className="series-error">{error}</div>}

    {!loading && (
      <div className="series-grid">
        {filteredSeries.length === 0 ? (
          <EmptyState message="Try changing filters." />
        ) : (
          filteredSeries.map((item) => (
            <div key={item.id} className="series-card">
              <div className="series-card-top">
                <h3 className="series-title-text">{item.title}</h3>
                <StatusBadge status={item.status} />
              </div>

              <div className="series-genres">
                {item.genres.map((genre) => (
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