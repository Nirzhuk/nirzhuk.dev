import React from 'react';

const AvailableForWork = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 relative">
        <div className="absolute size-2 bg-terminal  animate-ping" />
        <div className="size-2 bg-terminal " />
      </div>

      <h2 className="text-xs font-mono font-bold">Available for work</h2>
    </div>
  );
};

export default AvailableForWork;
