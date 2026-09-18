import "./FleetSkeleton.css";

const FleetSkeleton = () => {
  return (
    <div className="fleet-skeleton">

      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="fleet-skeleton-row"
        >
          {[...Array(7)].map((__, i) => (
            <div
              key={i}
              className="fleet-skeleton-box"
            />
          ))}
        </div>
      ))}

    </div>
  );
};

export default FleetSkeleton;