import "./RouteSkeleton.css";

export default function RouteSkeleton() {
  return (
    <div className="route-skeleton">

      <div className="skeleton-header"></div>

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="skeleton-row"
        >
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
        </div>
      ))}

    </div>
  );
}