import { ReactNode } from "react";

const LayoutDesign = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full relative">
      {children}
      <div
        className="absolute top-[-885px] left-[-220px] h-[1000px] w-[132%] !min-w-[1800px] flex items-end"
        style={{
          transform:
            "perspective(1000px) rotateY(0deg) rotateX(-30deg) translateX(0%) translateY(0px)",
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(0deg, rgba(5,0,0,1) 0%, rgba(106,34,112,1) 30%, rgba(193,68,204,1) 100%)",
        }}
      >
        <div className="relative w-full h-full flex">
          <img
            src="images/stickers/stickers-1.svg"
            alt="sticker1"
            className="w-96 absolute bottom-5 left-96 rotate-45"
          />
          <div
            className="absolute w-full h-full bottom-0 left-0 z-10"
            style={{
              background:
                "linear-gradient(0deg, rgba(5,0,0,0.3) 0%, rgba(106,34,112,0.3) 30%, rgba(193,68,204,1) 100%)",
            }}
          ></div>
        </div>
      </div>
      <div
        className="absolute top-[-425px] left-[-1200px] !h-[150vh] min-h-[1600px] !max-h-[1600px] w-[2000px]"
        style={{
          transform:
            "perspective(1000px) rotateY(70deg) rotateX(0deg) translateX(0px) translateY(0px)",
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(270deg, rgba(5,0,0,1) 0%, rgba(106,34,112,1) 100%, rgba(193,68,204,1) 100%)",
        }}
      >
        <div
          className="relative w-full h-full flex"
          style={{
            transformStyle: "inherit",
          }}
        >
          <img
            src="images/stickers/stickers-4.svg"
            alt="sticker4"
            className="w-96 absolute bottom-96 right-[800px] rotate-45"
          />
          <div
            className="absolute w-full h-full right-0 top-0 z-10"
            style={{
              background:
                "linear-gradient(270deg, rgba(5,0,0,0.3) 0%, rgba(106,34,112,0.3) 100%, rgba(193,68,204,1) 100%)",
            }}
          ></div>
        </div>
      </div>
      <div
        className="absolute top-[-425px] right-[-1200px] !h-[150vh] min-h-[1600px] !max-h-[1600px] w-[2000px]"
        style={{
          transform:
            "perspective(1000px) rotateY(-70deg) rotateX(0deg) translateX(0px) translateY(0px)",
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(90deg, rgba(5,0,0,1) 0%, rgba(106,34,112,1) 100%, rgba(193,68,204,1) 100%)",
        }}
      >
        <div className="relative w-full h-full flex">
          <img
            src="images/stickers/stickers-3.svg"
            alt="sticker3"
            className="w-96 absolute top-96 left-96"
          />
          <div
            className="absolute w-full h-full left-0 top-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,0,0,0.5) 0%, rgba(106,34,112,0.5) 100%, rgba(193,68,204,1) 100%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LayoutDesign;
