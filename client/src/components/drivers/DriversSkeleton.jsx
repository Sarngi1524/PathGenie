import "./DriversSkeleton.css";

const DriversSkeleton = () => {
  return (
    <div className="drivers-skeleton">

      {Array.from({ length: 8 }).map((_, index) => (
        <div
          className="driver-skeleton-row"
          key={index}
        />
      ))}

    </div>
  );
};

export default DriversSkeleton;