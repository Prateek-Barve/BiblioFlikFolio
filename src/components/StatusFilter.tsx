import "./Filters.css";

interface Props {
  selected: string;
  onChange: (value: string) => void;
  data: string;
}

export default function StatusFilter({ selected, onChange, data }: Props) {
  return (
    <div className="filter-wrapper">
      <label className="filter-label">Status</label>

      <div className="select-container">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Completed">Watched / Read</option>
          {data !== "movies" && <option value={data === "books" ? "Reading" : "Watching"}>Watching / Reading</option>}
          <option value={data === "books" ? "Unread" : "Unwatched"}>Unwatched / Unread</option>
        </select>
        <span className="select-arrow">⌄</span>
      </div>
    </div>
  );
}