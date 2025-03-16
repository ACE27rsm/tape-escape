import { ReactNode } from "react";

const LayoutMonitor = ({ children }: { children: ReactNode }) => {
  return (
    <div className="!rounded-4xl overflow-hidden h-full relative !border-black-500 !border-r-8 !border-t-8 !border-l-8">
      <div
        className="overflow-y-auto h-full !p-10"
        style={{
          backgroundImage: "url('/images/glitch-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </div>

      <div className="absolute w-full h-full top-0 left-0 bg-[#66ff0044] pointer-events-none !z-50"></div>
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
