interface StatusBadgeProps {
  status: 'available' | 'issued' | 'overdue' | 'warning';
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusClasses = {
    available: 'bg-green-100 text-green-800 border border-green-300',
    issued: 'bg-blue-100 text-blue-800 border border-blue-300',
    overdue: 'bg-red-100 text-red-800 border border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[status]}`}>
      {label}
    </span>
  );
}
