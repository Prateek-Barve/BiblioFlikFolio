interface Props {
  status: string;
  date?: string;
}

export default function StatusBadge({ status, date }: Props) {
  const getClass = () => {
    switch (status) {
      case "Completed":
        if (date === "books") {
          status = "Read";
        }else{
          status = "Watched";
        }
        return "badge badge-completed";
      case "Reading":
        return "badge badge-reading";
      case "Unwatched":
        return "badge badge-notstarted";
      case "Unread":
        return "badge badge-notstarted";
      case "Watching":
        return "badge badge-reading";
      default:
        return "badge";
    }
  };

  return <span className={getClass()}>{status}</span>;
}