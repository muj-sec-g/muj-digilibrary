import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: 'blue' | 'purple' | 'red' | 'green';
  description?: string;
}

export function DashboardCard({
  title,
  value,
  icon,
  color = 'blue',
  description,
}: DashboardCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-200',
    purple: 'from-purple-500 to-purple-600 shadow-purple-200',
    red: 'from-red-500 to-red-600 shadow-red-200',
    green: 'from-green-500 to-green-600 shadow-green-200',
  };

  const bgClasses = {
    blue: 'from-blue-50 to-blue-100/50',
    purple: 'from-purple-50 to-purple-100/50',
    red: 'from-red-50 to-red-100/50',
    green: 'from-green-50 to-green-100/50',
  };

  return (
    <div className={`bg-gradient-to-br ${bgClasses[color]} rounded-2xl border border-orange-100 shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group`}>
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
