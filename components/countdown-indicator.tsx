interface CountdownIndicatorProps {
  daysRemaining: number;
}

export function CountdownIndicator({ daysRemaining }: CountdownIndicatorProps) {
  let statusColor = 'bg-green-100 text-green-800';
  let statusLabel = 'Good Standing';

  if (daysRemaining < 0) {
    statusColor = 'bg-red-100 text-red-800';
    statusLabel = 'Overdue';
  } else if (daysRemaining <= 5) {
    statusColor = 'bg-yellow-100 text-yellow-800';
    statusLabel = 'Due Soon';
  }

  return (
    <div className={`px-3 py-2 rounded-lg ${statusColor} text-center`}>
      <p className="text-xs font-semibold">{statusLabel}</p>
      <p className="text-sm font-bold">
        {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days left`}
      </p>
    </div>
  );
}
