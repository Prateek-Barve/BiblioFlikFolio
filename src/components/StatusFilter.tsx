import "./Filters.css";

interface Props {
  selected: string;
  onChange: (value: string) => void;
}

export default function StatusFilter({ selected, onChange }: Props) {
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
          <option value="Completed">Completed</option>
          <option value="Reading">Reading</option>
          <option value="NotStarted">Not Started</option>
        </select>
        <span className="select-arrow">⌄</span>
      </div>
    </div>
  );
}