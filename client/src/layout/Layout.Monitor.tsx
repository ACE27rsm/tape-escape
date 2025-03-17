import { ReactNode } from "react";

const LayoutMonitor = ({ children }: { children: ReactNode }) => {
  return (
    <div className="!rounded-4xl overflow-hidden bg-gray-600 h-full relative !border-black-500 !border-r-8 !border-t-8 !border-l-8">
      <div
        id="content-wrapper"
        className="relative h-full w-full overflow-y-auto bg-black"
      >
        {children}
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/monitor-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.1,
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};

export default LayoutMonitor;
