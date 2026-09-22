import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = 'Loading inventory data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px] text-center">
      <Loader2 className="w-9 h-9 text-blue-500 animate-spin mb-3" />
      <p className="text-sm font-medium text-slate-400">{message}</p>
    </div>
  );
};

export default LoadingState;
