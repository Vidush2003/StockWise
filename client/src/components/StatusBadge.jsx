import React from 'react';
import { getStatusBadgeStyle } from '../utils/stockHelpers';

const StatusBadge = ({ status }) => {
  const { label, badgeClass, dotClass } = getStatusBadgeStyle(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all ${badgeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
};

export default StatusBadge;
