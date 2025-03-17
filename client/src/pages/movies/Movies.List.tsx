/// * utils
import cn from "@/utils/cn";

/// * hooks
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";

/// * actions
import { MOVIES_DETAILS_GET } from "../../store/actions";
import { useCallback } from "react";

const MoviesList = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movies.list.moviesList);

  /// + ***************************************************
  const handelSelect = useCallback(
    (movieId: number) => {
      dispatch(MOVIES_DETAILS_GET(movieId));
    },
    [dispatch]
  );

  /// m ***************************************************
  return (
    <div className="h-full overflow-y-auto w-96 shrink-0">
      {movieList.map((movie, k) => (
        <div
          color={"blue.500"}
          key={movie.id}
          className={cn(
            "!p-4 cursor-pointer",
            k % 2 === 0
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-amber-400 hover:bg-amber-500"
          )}
          onClick={() => handelSelect(movie.id)}
        >
          <div className="!text-xl truncate">{movie.title}</div>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
