import "./LoadingSkeleton.css";

export default function LoadingSkeleton() {
  return (
    <div className="loading-wrapper">

      <div className="skeleton-header"></div>

      <div className="skeleton-table">

        {[1,2,3,4,5,6].map((item)=>(
          <div
            key={item}
            className="skeleton-row"
          >
            <div className="skeleton-box small"></div>
            <div className="skeleton-box medium"></div>
            <div className="skeleton-box medium"></div>
            <div className="skeleton-box small"></div>
            <div className="skeleton-box badge"></div>
            <div className="skeleton-box badge"></div>
            <div className="skeleton-box small"></div>
            <div className="skeleton-actions">

              <div className="circle"></div>

              <div className="circle"></div>

              <div className="circle"></div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}