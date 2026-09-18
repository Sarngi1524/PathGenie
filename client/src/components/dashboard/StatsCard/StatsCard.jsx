import "./StatsCard.css";

export default function StatsCard({
  title,
  value,
  icon,
  color,
  change,
}) {
  return (
    <div className="stats-card">
      <div
        className="stats-icon"
        style={{
          background: color,
        }}
      >
        {icon}
      </div>

      <div className="stats-content">
        <p className="stats-title">{title}</p>

        <h2>{value}</h2>

        <span className="stats-change">
          {change}
        </span>
      </div>
    </div>
  );
}