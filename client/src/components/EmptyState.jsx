import React from 'react';
import { PackageX } from 'lucide-react';

const EmptyState = ({
  title = 'No products found',
  description = 'Try adjusting your search query or filters.',
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[320px] text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/50">
      <div className="p-4 rounded-2xl bg-slate-800/60 text-slate-400 mb-4 border border-slate-700/50">
        <PackageX className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-sm">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
