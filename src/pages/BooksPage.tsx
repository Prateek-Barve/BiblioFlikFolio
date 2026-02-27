import { useEffect, useState } from "react";
import { getBooks } from "../api/booksApi";
import type { Book } from "../types/book";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import StatusFilter from "../components/StatusFilter";
import GenreFilter from "../components/GenreFilter";
import type { Genre } from "../types/genre";
import { getGenres } from "../api/genresApi";
import EmptyState from "../components/EmptyState";
import "./bookpage.css";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const filteredBooks = books
  .filter(b => selectedGenre ? b.genres.includes(selectedGenre) : true)
  .filter(b => selectedStatus ? b.status === selectedStatus : true);
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const result = await getBooks(page, pageSize);

      setBooks(result.data);
      setTotalPages(Math.ceil(result.totalRecords / pageSize));
      setError(null);
    } catch (err) {
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);
  useEffect(() => {
  const fetchGenres = async () => {
    const data = await getGenres();
    setGenres(data);
  };

  fetchGenres();
}, []);

  return (
  <div className="books-page">
    <div className="books-header">
      {/* <h2 className="books-title">the most powerful people in the world are storytellers</h2>
      <h2 className="books-title-2">(the legendary guy who made your iPhone)</h2> */}
      <div className="quote-block">
      <h2 className="books-title">
        "the most powerful people in the world are storytellers"
      </h2>
      <h2 className="books-title-2">
        (the legendary guy who made your iPhone)
      </h2>
    </div>
    </div>

    <div className="books-filters">
      <GenreFilter
        genres={genres}
        selected={selectedGenre}
        onChange={setSelectedGenre}
      />

      <StatusFilter
        selected={selectedStatus}
        onChange={setSelectedStatus}
        data={"books"}
      />
    </div>

    {loading && <div className="books-state">Loading books...</div>}
    {error && <div className="books-error">{error}</div>}

    {!loading && (
      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <EmptyState message="Try changing filters." />
        ) : (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-card-top">
                <h3 className="book-title">{book.title}</h3>
                <StatusBadge status={book.status} date="books" />
              </div>

              <p className="book-author">{book.author}</p>

              <div className="book-genres">
                {book.genres.map((genre) => (
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