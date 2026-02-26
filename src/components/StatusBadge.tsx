interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const getClass = () => {
    switch (status) {
      case "Completed":
        return "badge badge-completed";
      case "Reading":
        return "badge badge-reading";
      case "NotStarted":
        return "badge badge-notstarted";
      default:
        return "badge";
    }
  };

  return <span className={getClass()}>{status}</span>;
}