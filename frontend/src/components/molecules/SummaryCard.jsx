import React from 'react';

const SummaryCard = ({ title, count, icon: Icon, iconColor, cardColor }) => {
  return (
    <div className={`p-4 rounded-lg flex justify-between items-center shadow-md ${cardColor}`}>
      <div>
        <p className="text-gray-300 text-sm font-medium">{title}</p>
        <p className="text-white text-3xl font-bold">{count}</p>
      </div>
      <div className={`p-2 rounded-lg ${iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default SummaryCard