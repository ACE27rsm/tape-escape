import { ReactNode } from "react";

const LayoutDesign = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full relative">
      {children}
      <div
        className="absolute top-[-885px] left-[-220px] h-[1000px] w-[132%] !min-w-[1800px]"
        style={{
          transform:
            "perspective(1000px) rotateY(0deg) rotateX(-30deg) translateX(0%) translateY(0px)",
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(0deg, rgba(5,0,0,1) 0%, rgba(106,34,112,1) 30%, rgba(193,68,204,1) 100%)",
        }}
      ></div>
      <div
        className="absolute top-[-425px] left-[-1200px] !h-[150vh] min-h-[1600px] !max-h-[1600px] w-[2000px]"
        style={{
          transform:
            "perspective(1000px) rotateY(70deg) rotateX(0deg) translateX(0px) translateY(0px)",
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(270deg, rgba(5,0,0,1) 0%, rgba(106,34,112,1) 100%, rgba(193,68,204,1) 100%)",
        }}
      ></div>
      <div
        className="absolute top-[-425px] right-[-1200px] !h-[150vh] min-h-[1600px] !max-h-[1600px] w-[2000px]"
        style={{
          transform:
            "perspective(1000px) rotateY(-70deg) rotateX(0deg) translateX(0px) translateY(0px)",
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(90deg, rgba(5,0,0,1) 0%, rgba(106,34,112,1) 100%, rgba(193,68,204,1) 100%)",
        }}
      ></div>
    </div>
  );
};

export default LayoutDesign;
