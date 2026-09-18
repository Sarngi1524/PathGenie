import "./ReportsSkeleton.css";

const ReportsSkeleton = () => {
  return (
    <div className="reports-skeleton">

      {/* Stats Cards */}
      <div className="stats-skeleton-grid">
        {[...Array(6)].map((_, index) => (
          <div className="stat-skeleton-card" key={index}>
            <div className="stat-icon-skeleton shimmer"></div>

            <div className="stat-content">
              <div className="line line-lg shimmer"></div>
              <div className="line line-sm shimmer"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Chart */}
      <div className="chart-skeleton shimmer"></div>

      {/* Other Charts */}
      <div className="charts-grid">

        {[...Array(3)].map((_, index) => (
          <div className="small-chart-skeleton" key={index}>
            <div className="line line-md shimmer"></div>

            <div className="chart-placeholder shimmer"></div>
          </div>
        ))}

      </div>

      {/* Bottom Cards */}
      <div className="bottom-grid">

        {[...Array(3)].map((_, index) => (
          <div className="list-card-skeleton" key={index}>
            <div className="line line-md shimmer"></div>

            {[...Array(5)].map((_, i) => (
              <div className="list-item" key={i}>
                <div className="circle shimmer"></div>

                <div className="list-text">
                  <div className="line line-sm shimmer"></div>
                  <div className="line line-xs shimmer"></div>
                </div>
              </div>
            ))}

          </div>
        ))}

      </div>

    </div>
  );
};

export default ReportsSkeleton;