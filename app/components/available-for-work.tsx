import React from 'react';

const AvailableForWork = () => {
  return (
    <a
      href="mailto:hello@nirzhuk.dev?subject=Work Opportunity Inquiry"
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <div className="flex items-center gap-2 relative">
        <div className="absolute size-2 bg-terminal  animate-ping" />
        <div className="size-2 bg-terminal " />
      </div>

      <h2 className="text-xs font-mono font-bold">Available for work</h2>
      <span className="text-xs text-gray-400">•</span>
      <span className="text-xs font-mono text-primary">me@nirzhuk.dev</span>
    </a>
  );
};

export default AvailableForWork;
