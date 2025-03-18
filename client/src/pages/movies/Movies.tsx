import { useEffect } from "react";

/// * hooks
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

/// * components
import MoviesHeader from "./Movies.Header";
import MoviesList from "./Movies.List";
import MoviesDetails from "./Movies.Details";
import LottieAnimation from "../../components/lottie-animation/LottieAnimation";

/// * actions
import { MOVIES_GENRES_GET, MOVIES_LIST_GET } from "../../store/actions";

const Movies = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const fetching = useAppSelector((state) => state.movies.list.fetching);

  /// ? ***************************************************
  useEffect(() => {
    dispatch(MOVIES_GENRES_GET());
    dispatch(MOVIES_LIST_GET({ query: "", page: 1 }));
  }, []);

  /// m ***************************************************
  return (
    <div className="flex flex-col h-[calc(100%-137px)]">
      <MoviesHeader />
      <div className="grow flex items-stretch h-[calc(100%-137px)]">
        {fetching ? (
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-64">
              <LottieAnimation animationPath="/lotties/hourglass.json" loop />
            </div>
          </div>
        ) : (
          <>
            <MoviesList />
            <MoviesDetails />
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;
