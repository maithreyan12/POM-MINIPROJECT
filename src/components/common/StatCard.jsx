import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  trend,
  onClick,
  badgeText
}) => {
  const colorStyles = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/40 text-royal-600 dark:text-royal-400",
      border: "hover:border-royal-500/50"
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
      border: "hover:border-emerald-500/50"
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
      border: "hover:border-rose-500/50"
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
      border: "hover:border-amber-500/50"
    },
    navy: {
      bg: "bg-navy-100 dark:bg-navy-900/60 text-navy-800 dark:text-navy-200",
      border: "hover:border-navy-500/50"
    }
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle hover:shadow-premium transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${style.border}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${style.bg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {value}
        </span>
        {badgeText && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {badgeText}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          {subtitle && <span>{subtitle}</span>}
          {trend && (
            <span className={`font-semibold ${
              trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
            }`}>
              {trend.text}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
