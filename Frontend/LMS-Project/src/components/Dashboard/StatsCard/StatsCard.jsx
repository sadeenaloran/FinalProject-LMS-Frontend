const StatsCard = ({ icon, title, value, color, trend }) => {
  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-700",
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    green: "bg-green-50 text-green-700",
  };

  return (
    <div className={`stats-card ${colorClasses[color]}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <h3>{title}</h3>
        <p className="stats-value">{value}</p>
        {trend && (
          <div className={`stats-trend ${trend}`}>
            {trend === "up" && "↑ Improved"}
            {trend === "down" && "↓ Decreased"}
            {trend === "neutral" && "→ Stable"}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
