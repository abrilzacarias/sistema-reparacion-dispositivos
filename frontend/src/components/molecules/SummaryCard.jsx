import React from 'react';

const SummaryCard = ({ title, count, icon: Icon, variant = 'default', children }) => {
  let cardClasses = "bg-card text-card-foreground"; // Default card background and text
  let iconContainerClasses = "bg-muted dark:bg-slate-700"; // Default icon container background
  let iconClasses = "text-muted-foreground dark:text-slate-300"; // Default icon color
  const titleTextClasses = "text-muted-foreground dark:text-slate-400";
  const countTextClasses = "text-card-foreground dark:text-white";

  switch (variant) {
    case 'info':
      cardClasses = "bg-blue-500/10 dark:bg-blue-800/20 text-blue-700 dark:text-blue-300";
      iconContainerClasses = "bg-blue-500/20 dark:bg-blue-700/30";
      iconClasses = "text-blue-600 dark:text-blue-400";
      break;
    case 'success':
      cardClasses = "bg-green-500/10 dark:bg-green-800/20 text-green-700 dark:text-green-300";
      iconContainerClasses = "bg-green-500/20 dark:bg-green-700/30";
      iconClasses = "text-green-600 dark:text-green-400";
      break;
    case 'destructive':
      cardClasses = "bg-red-500/10 dark:bg-red-800/20 text-red-700 dark:text-red-300";
      iconContainerClasses = "bg-red-500/20 dark:bg-red-700/30";
      iconClasses = "text-red-600 dark:text-red-400";
      break;
    default:
      // Default uses bg-card, text-card-foreground from the initial values
      // Ensure default text colors are also theme-aware if not covered by cardClasses
      // titleTextClasses and countTextClasses handle this.
      break;
  }

  return (
    <div className={`p-4 rounded-lg shadow-md ${cardClasses}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${titleTextClasses}`}>{title}</p>
          <p className={`text-3xl font-bold ${countTextClasses}`}>{count}</p>
        </div>
        {Icon && (
          <div className={`p-2 rounded-lg ${iconContainerClasses}`}>
            <Icon className={`w-6 h-6 ${iconClasses}`} />
          </div>
        )}
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default SummaryCard;