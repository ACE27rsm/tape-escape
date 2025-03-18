import React from "react";

const MoviesDetailsVHS = ({ poster_path }: { poster_path: string | null }) => {
  if (!poster_path) {
    return null;
  }

  return (
    <div className="w-64 h-96  shrink-0 !p-5 relative xl:translate-x-[-30px]">
      <img
        src={poster_path}
        alt="poster"
        className="w-64 !h-[319px] !border-solid !bg-gray-500 !border-r-4"
        style={{
          transform:
            "perspective(1000px) rotateY(-30deg) rotateX(0deg) translateX(0px) translateY(0px)",
          transformStyle: "preserve-3d",
        }}
      />

      <div
        className="absolute w-2 h-[330px] top-[14px] right-[-10px] bg-gray-700"
        style={{
          transform:
            "perspective(1000px) rotateY(-30deg) rotateX(0deg) translateX(0px) translateY(0px)",
          transformStyle: "preserve-3d",
        }}
      />
      <div
        className="absolute w-10 h-[330px] top-[14px] right-[-8px] bg-gray-600"
        style={{
          transform:
            "perspective(1000px) rotateY(30deg) rotateX(0deg) translateX(0px) translateY(0px)",
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  );
};

export default MoviesDetailsVHS;
