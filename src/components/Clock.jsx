import React from 'react';

const Clock = ({ start, end }) => {
  const radius = 20;  // reduce this to move the path inside
  const strokeWidth = 40;  // thickness of the path
  const startHour = start.hour() + start.minute() / 60;
  const endHour = end.hour() + end.minute() / 60;
  const startDegree = start * 30;
  const endDegree = end * 30;
  const largeArcFlag = endHour - startHour > 6 ? 1 : 0;

  const startX = 50 + radius * Math.cos(Math.PI * startHour / 6 - Math.PI / 2);
  const startY = 50 + radius * Math.sin(Math.PI * startHour / 6 - Math.PI / 2);
  const endX = 50 + radius * Math.cos(Math.PI * endHour / 6 - Math.PI / 2);
  const endY = 50 + radius * Math.sin(Math.PI * endHour / 6 - Math.PI / 2);

  return (
    <div style={{ width: '60px', height: '60px' }}>  {/* adjust this to change the size */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Outer border */}
        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="1" fill="none" />
        {/* Inner border */}
        {/* Clock ticks */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1={50}
            y1={10}
            x2={50}
            y2={16}
            stroke="black"
            strokeWidth={2}
            transform={`rotate(${30 * i}, 50, 50)`}
          />
        ))}
        {/* Meeting arc */}
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`}
          stroke="white"
          fill="transparent"
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
};

export default Clock;
