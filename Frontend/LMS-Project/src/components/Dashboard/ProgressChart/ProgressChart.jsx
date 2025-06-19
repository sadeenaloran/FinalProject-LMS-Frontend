// src/components/dashboard/ProgressChart.js

const ProgressChart = ({ data }) => {
  return (
    <div className="progress-chart">
      {data.map((item, idx) => (
        <div key={idx} className="progress-item">
          <h4>{item.course}</h4>
          <div className="chart-bar">
            <div className="chart-fill" style={{ width: `${item.progress}%` }}>
              {item.progress}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProgressChart;
