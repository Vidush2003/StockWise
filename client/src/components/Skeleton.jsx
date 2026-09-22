import React from 'react';

export const SkeletonCard = () => (
  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 animate-pulse space-y-3">
    <div className="flex justify-between items-center">
      <div className="h-3 w-24 bg-slate-800 rounded-md" />
      <div className="h-10 w-10 bg-slate-800 rounded-xl" />
    </div>
    <div className="h-7 w-32 bg-slate-800 rounded-md" />
    <div className="h-3 w-40 bg-slate-800/60 rounded-md" />
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
    <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex justify-between">
      <div className="h-4 w-32 bg-slate-800 rounded-md" />
      <div className="h-4 w-24 bg-slate-800 rounded-md" />
    </div>
    <div className="divide-y divide-slate-800/60 p-4 space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between animate-pulse py-2">
          <div className="space-y-2">
            <div className="h-4 w-48 bg-slate-800 rounded-md" />
            <div className="h-3 w-24 bg-slate-800/60 rounded-md" />
          </div>
          <div className="h-4 w-16 bg-slate-800 rounded-md" />
          <div className="h-4 w-20 bg-slate-800 rounded-md" />
          <div className="h-6 w-20 bg-slate-800 rounded-full" />
          <div className="h-8 w-24 bg-slate-800 rounded-xl" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonChart = () => (
  <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 animate-pulse space-y-4">
    <div className="flex justify-between items-center">
      <div className="h-5 w-48 bg-slate-800 rounded-md" />
      <div className="h-4 w-20 bg-slate-800/60 rounded-md" />
    </div>
    <div className="h-60 w-full bg-slate-800/40 rounded-xl" />
  </div>
);

const Skeleton = {
  Card: SkeletonCard,
  Table: SkeletonTable,
  Chart: SkeletonChart
};

export default Skeleton;
