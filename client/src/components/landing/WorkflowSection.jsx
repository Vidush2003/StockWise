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
    <section id="workflow" className="py-24 relative z-10 px-6 bg-slate-900/50">
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
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-slate-800">
                  <div className="h-full bg-brand-500 w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
              )}

              <div className="mb-6 w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 text-xl font-black text-slate-500 group-hover:text-brand-400 group-hover:border-brand-500/50 transition-colors z-10 relative bg-surface-a">
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
