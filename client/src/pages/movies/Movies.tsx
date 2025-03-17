import { useEffect } from "react";

/// * hooks
import { useAppDispatch } from "../../hooks/useRedux";

/// * components
import MoviesHeader from "./Movies.Header";
import MoviesList from "./Movies.List";

/// * actions
import { MOVIES_GENRES_GET, MOVIES_LIST_GET } from "../../store/actions";
import MoviesDetails from "./Movies.Details";

const Movies = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();

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
        <MoviesList />
        <MoviesDetails />
      </div>
    </div>
  );
};

export default Movies;
