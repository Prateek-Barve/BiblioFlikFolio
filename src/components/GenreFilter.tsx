import type { Genre } from "../types/genre";
import "./Filters.css";

interface Props {
  genres: Genre[];
  selected: string;
  onChange: (value: string) => void;
}

export default function GenreFilter({ genres, selected, onChange }: Props) {
  return (
    <div className="filter-wrapper">
      <label className="filter-label">Genre</label>

      <div className="select-container">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
        <span className="select-arrow">⌄</span>
      </div>
    </div>
  );
}