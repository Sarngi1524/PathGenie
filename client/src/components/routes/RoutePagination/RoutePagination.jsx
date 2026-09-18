import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./RoutePagination.css";

export default function RoutePagination({
  page,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="route-pagination">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <FaChevronLeft />
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <FaChevronRight />
      </button>

    </div>
  );
}