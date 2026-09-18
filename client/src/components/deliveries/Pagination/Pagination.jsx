import "./Pagination.css";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Pagination({
  page,
  setPage,
  totalPages,
}) {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">

      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <FaChevronLeft />
      </button>

      {pages.map((number) => (
        <button
          key={number}
          className={`page-number ${
            page === number ? "active" : ""
          }`}
          onClick={() => setPage(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        <FaChevronRight />
      </button>

    </div>
  );
}