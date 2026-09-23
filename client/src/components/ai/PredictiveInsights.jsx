import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingDown, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../../services/api';

const PredictiveInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get('/ai/forecast');
        if (response.data && response.data.data) {
          setInsights(response.data.data);
        } else {
          setInsights([]);
        }
      } catch (err) {
        console.error('Failed to load AI Insights', err);
        setError('Failed to generate predictive insights. Check API configuration.');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 text-brand-400 animate-spin mb-4" />
        <p className="text-slate-400 text-sm">AI is analyzing your inventory burn rates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] border border-red-500/20">
        <AlertTriangle className="w-8 h-8 text-red-400 mb-4" />
        <p className="text-slate-400 text-sm text-center">{error}</p>
      </div>
    );
  }

  if (insights.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6 min-h-[200px] flex flex-col items-center justify-center">
        <Sparkles className="w-8 h-8 text-brand-400 opacity-50 mb-4" />
        <p className="text-slate-400 text-sm text-center">No predictive insights available right now. Your stock levels look stable.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/20 rounded-full blur-[60px] pointer-events-none group-hover:bg-brand-500/30 transition-all duration-700"></div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-brand-500/20 rounded-xl">
          <Sparkles className="w-5 h-5 text-brand-400" />
        </div>
        <h3 className="font-semibold text-lg text-white">AI Predictive Insights</h3>
      </div>

      <div className="space-y-4 relative z-10">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:bg-slate-900/60 transition-colors">
            <div className="shrink-0 mt-1">
              {insight.toLowerCase().includes('reorder') || insight.toLowerCase().includes('fast') ? (
                <TrendingDown className="w-5 h-5 text-amber-400" />
              ) : (
                <Clock className="w-5 h-5 text-brand-400" />
              )}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveInsights;
