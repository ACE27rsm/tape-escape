import { useEffect, useMemo } from "react";

/// * hooks
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

/// * actions
import { MOVIES_DETAILS_GET } from "../../store/actions";

const MoviesDetails = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movies.list.moviesList);
  const movieSelected = useAppSelector(
    (state) => state.movies.movieDetails.movie
  );

  /// ? ***************************************************
  useEffect(() => {
    if (movieList.length) dispatch(MOVIES_DETAILS_GET(movieList[0].id));
  }, [movieList]);
  console.log(movieSelected);

  /// o ***************************************************
  const score = useMemo(() => {
    let score = "⭐";

    if (movieSelected?.vote_average) {
      for (let i = 0; i < Math.ceil(movieSelected.vote_average); i++) {
        score += "⭐";
      }
    }

    return score;
  }, [movieSelected?.vote_average]);

  return (
    <div className="grow bg-amber-700 h-full overflow-auto">
      <div
        className="relative"
        style={{
          backgroundImage: `url(${movieSelected?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="!z-10 h-full bg-[#00000080] !p-8 !text-white w-full">
          <h3 className="font-bold !text-6xl truncate">
            {movieSelected?.title}
          </h3>
          <div className="flex gap-4 w-full flex-col md:flex-row">
            <div className="w-64 shrink-0">
              <img
                src={movieSelected?.poster_path}
                alt="poster"
                className="w-64 h-96"
              />
            </div>
            <div className="grow">
              {movieSelected?.vote_count && movieSelected?.vote_count > 0 && (
                <>
                  <div className="flex w-full justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                    <div className="!font-bold w-64 shrink-0">Score:</div>
                    <div>{score}</div>
                  </div>
                  <div className="flex w-full justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                    <div className="!font-bold w-64 shrink-0">
                      Number of Reviews:
                    </div>
                    <div>{movieSelected.vote_count}</div>
                  </div>
                </>
              )}
              <div className="flex w-full justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                <div className="!font-bold w-64 shrink-0">Original Title:</div>
                <div>{movieSelected?.original_title}</div>
              </div>
              <div className="flex w-full justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                <div className="!font-bold w-64 shrink-0">Release Date:</div>
                <div>{movieSelected?.release_date}</div>
              </div>
              <div className="flex w-full justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                <div className="!font-bold w-64 shrink-0">Overview:</div>
                <div className="text-justify">{movieSelected?.overview}</div>
              </div>
              <div className="flex w-full justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                <div className="!font-bold w-64 shrink-0">Tag Line:</div>
                <div>{movieSelected?.tagline}</div>
              </div>
              <div className="flex w-full justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                <div className="!font-bold w-64 shrink-0">Runtime:</div>
                <div>{movieSelected?.runtime}'</div>
              </div>
              <div className="flex w-full justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                <div className="!font-bold w-64 shrink-0">IMDB Id:</div>
                <div>{movieSelected?.imdb_id}</div>
              </div>
              <div className="flex w-full justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                <div className="!font-bold w-64 shrink-0">Home Page:</div>
                <div>
                  <a
                    href={movieSelected?.homepage}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {movieSelected?.homepage}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;
