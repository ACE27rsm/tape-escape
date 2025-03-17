import { ReactNode } from "react";

const LayoutMonitor = ({ children }: { children: ReactNode }) => {
  return (
    <div className="!rounded-4xl overflow-hidden bg-gray-600 h-full relative !border-black-500 !border-r-8 !border-t-8 !border-l-8">
      <div className="relative h-full w-full">
        {children}
        <div
          className="absolute inset-0"
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

      <div className="absolute w-full h-full top-0 left-0 bg-[#66ff0077] pointer-events-none !z-50 mix-blend-overlay"></div>
      <div
        className="absolute w-full h-full top-0 left-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(175,164,164,0) 86%, rgba(55,55,55,1) 100%)",
        }}
      ></div>
    </div>
  );
};

export default LayoutMonitor;
