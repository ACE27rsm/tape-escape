import { useEffect } from "react";

/// * hooks
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

/// * actions
import { MOVIES_DETAILS_GET } from "../../store/actions";

/// * components
import LottieAnimation from "../../components/lottie-animation/LottieAnimation";
import MovieDetailsInfo from "./Movie.Details.Info";

const MoviesDetails = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movies.list.moviesList);
  const page = useAppSelector((state) => state.movies.list.page);
  const fetching = useAppSelector(
    (state) => state.movies.movieDetails.fetching
  );
  const movieSelected = useAppSelector(
    (state) => state.movies.movieDetails.movie
  );

  /// ? ***************************************************
  useEffect(() => {
    console.log("AAAA");
    if (movieList.length) dispatch(MOVIES_DETAILS_GET(movieList[0].id));
  }, [page]);

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
        <MovieDetailsInfo movieSelected={movieSelected} />
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-64">SELECT A MOVIE</div>
        </div>
      )}
    </div>
  );
};

export default MoviesDetails;
