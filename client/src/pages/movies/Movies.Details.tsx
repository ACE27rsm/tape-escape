import { useEffect, useMemo } from "react";
import { Badge } from "@chakra-ui/react";

/// * hooks
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

/// * actions
import { MOVIES_DETAILS_GET } from "../../store/actions";

/// * components
import LottieAnimation from "../../components/lottie-animation/LottieAnimation";
import VHS from "./Movies.Details.VHS";

const MoviesDetails = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movies.list.moviesList);
  const fetching = useAppSelector(
    (state) => state.movies.movieDetails.fetching
  );
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

  /// m ***************************************************
  return (
    <div className="grow h-full overflow-auto">
      {fetching ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-64">
            <LottieAnimation animationPath="/lotties/hourglass.json" loop />
          </div>
        </div>
      ) : movieSelected ? (
        <div
          className="relative"
          style={{
            backgroundImage: movieSelected.backdrop_path
              ? `url(${movieSelected.backdrop_path})`
              : "unset",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="!z-10 h-full !p-8 !text-white">
            <div className="!mb-2">
              <h3 className="font-bold !text-6xl truncate">
                {movieSelected.title}
              </h3>

              {movieSelected.genres.length > 0 && (
                <div className="flex gap-4">
                  {movieSelected.genres.map((genre) => (
                    <Badge key={genre.id} className="!text-2xl">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-4 flex-col items-center xl:flex-row xl:items-start">
              <VHS poster_path={movieSelected.poster_path} />

              <div className="grow">
                {movieSelected.vote_count !== undefined &&
                  movieSelected.vote_count > 0 && (
                    <>
                      <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                        <div className="!font-bold w-32 lg:w-60 shrink xl:shrink-0">
                          Score:
                        </div>
                        <div>{score}</div>
                      </div>
                      <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                        <div className="!font-bold w-32 lg:w-60 shrink xl:shrink-0">
                          Number of Reviews:
                        </div>
                        <div>{movieSelected.vote_count}</div>
                      </div>
                    </>
                  )}
                <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                  <div className="!font-bold w-32 lg:w-60 shrink xl:shrink-0">
                    Original Title:
                  </div>
                  <div>{movieSelected.original_title}</div>
                </div>
                <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                  <div className="!font-bold w-32 lg:w-60 shrink xl:shrink-0">
                    Release Date:
                  </div>
                  <div>{movieSelected.release_date}</div>
                </div>
                <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                  <div className="!font-bold w-32 lg:w-60 shrink xl:shrink-0">
                    Overview:
                  </div>
                  <div className="text-justify">{movieSelected.overview}</div>
                </div>
                <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                  <div className="!font-bold w-32 lg:w-60 shrink xl:shrink-0">
                    Tag Line:
                  </div>
                  <div>{movieSelected.tagline}</div>
                </div>
                <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                  <div className="!font-bold w-32 lg:w-60 shrink xl:shrink-0">
                    Runtime:
                  </div>
                  <div>{movieSelected.runtime}'</div>
                </div>
                <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                  <div className="!font-bold w-32 lg:w-60 shrink xl:shrink-0">
                    IMDB Id:
                  </div>
                  <div>{movieSelected.imdb_id}</div>
                </div>
                <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
                  <div className="truncate max-w-[380px]">
                    <a
                      href={movieSelected.homepage}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {movieSelected.homepage}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-64">SELECT A MOVIE</div>
        </div>
      )}
    </div>
  );
};

export default MoviesDetails;
