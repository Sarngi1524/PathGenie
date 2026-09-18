import "./DriversPagination.css";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const DriversPagination = ({
  page,
  totalPages,
  setPage,
}) => {
  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages).keys()].map(
    (num) => num + 1
  );

  return (
    <div className="drivers-pagination">

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <FaChevronLeft />
      </button>

      {pages.map((number) => (
        <button
          key={number}
          className={
            page === number ? "active" : ""
          }
          onClick={() => setPage(number)}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        <FaChevronRight />
      </button>

    </div>
  );
};

export default DriversPagination;