import React, { ReactNode, useState } from "react";

export const Popover = ({ children }: { children: ReactNode }) => {
  const [stateOpen, setStateOpen] = useState(false);

  return (
    <div className="relative flex justify-center items-center">
      <div onClick={() => setStateOpen((ps) => !ps)}>{children}</div>

      {stateOpen && (
        <div className="absolute bottom-0 bg-white shadow-lg p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Title</h1>
            <button onClick={() => setStateOpen(false)}>Close</button>
          </div>
          <p>Content</p>
        </div>
      )}
    </div>
  );
};
