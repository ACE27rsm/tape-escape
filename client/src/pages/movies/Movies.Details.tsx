import { useEffect } from "react";

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

  /// ? ***************************************************

  return <div className="grow bg-amber-700">{movieSelected?.title}</div>;
};

export default MoviesDetails;
