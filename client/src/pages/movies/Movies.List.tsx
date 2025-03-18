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
  const movieSelected = useAppSelector(
    (state) => state.movies.movieDetails.movie
  );

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
      {movieList.map((movie, k) => {
        const isSelected = movieSelected?.id === movie.id;

        return (
          <div
            key={movie.id}
            className={cn(
              "!p-4 cursor-pointer",
              k % 2 === 0
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-amber-400 hover:bg-amber-500",
              isSelected && "bg-[#8103ff] hover:bg-[#8103ff]"
            )}
            onClick={() => handelSelect(movie.id)}
          >
            <div className="!text-xl truncate">{movie.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MoviesList;
