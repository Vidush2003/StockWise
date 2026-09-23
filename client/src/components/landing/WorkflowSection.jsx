import React from 'react';

const steps = [
  {
    num: "01",
    title: "ADD",
    desc: "Import or manually add products to your catalog."
  },
  {
    num: "02",
    title: "TRACK",
    desc: "Update stock levels dynamically as items move in and out."
  },
  {
    num: "03",
    title: "MONITOR",
    desc: "Set low-stock thresholds and get real-time health alerts."
  },
  {
    num: "04",
    title: "ACT",
    desc: "Restock before you run out. Never miss a beat."
  }
];

const WorkflowSection = () => {
  return (
    <section id="workflow" className="py-32 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            HOW IT WORKS
          </h2>
          <div className="w-20 h-1 bg-brand-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-[1px] bg-slate-800/50">
                  <div className="h-full bg-gradient-to-r from-brand-500 to-indigo-400 w-0 group-hover:w-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                </div>
              )}

              <div className="mb-6 w-16 h-16 rounded-full glass-panel-elevated flex items-center justify-center border border-white/5 text-xl font-black text-slate-500 group-hover:text-brand-400 group-hover:border-brand-500/50 transition-all z-10 relative bg-slate-950 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                {step.num}
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-white text-slate-200 transition-colors">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
