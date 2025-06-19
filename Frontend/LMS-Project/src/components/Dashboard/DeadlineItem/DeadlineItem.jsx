import React from "react";

const DeadlineItem = ({ course, assignment, dueDate, daysLeft }) => (
  <div className="deadline-item">
    <h4>
      {assignment} - {course}
    </h4>
    <p>
      Due: {dueDate} ({daysLeft} days left)
    </p>
  </div>
);
export default DeadlineItem;
