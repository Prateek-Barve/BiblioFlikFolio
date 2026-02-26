interface Props {
  message: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <div className="empty-wrapper">
      <div className="empty-card">
        <div className="empty-icon">📚</div>
        <h3>No Results Found</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}