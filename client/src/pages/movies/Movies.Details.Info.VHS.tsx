const MoviesDetailsVHS = ({ poster_path }: { poster_path: string | null }) => {
  if (!poster_path) {
    return (
      <div className="w-64 h-96  shrink-0 !p-5 relative xl:translate-x-[-30px] flex justify-center items-center">
        <div
          className="!p-2 w-max bg-[#0d253f] rounded-lg h-max  !border-solid !border-[#01b4e4] !border-r-4"
          style={{
            transform:
              "perspective(1000px) rotateY(-30deg) rotateX(0deg) translateX(0px) translateY(0px)",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src="images/logos/tmdb-logo.svg"
            alt="tmdb logo"
            className="!h-32"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-96  shrink-0 !p-5 relative xl:translate-x-[-30px]">
      <img
        src={poster_path}
        alt="poster"
        className="w-64 !h-[319px] !border-solid !bg-gray-500 !border-r-4 !rounded-[10px]"
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
