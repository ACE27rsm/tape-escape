import { useDispatch } from "react-redux";
import { useEffect } from "react";

/// * components
import { Button } from "../../components/ui/button";

/// * actions
import { MOVIES_LIST_GET, MOVIES_GENRES_GET } from "../../store/actions";
import { MenuContent, MenuItem } from "@/components/ui/menu";
import { useAppSelector } from "@/hooks/useRedux";
import cn from "../../utils/cn";

const Movies = () => {
  /// y ***************************************************
  const dispatch = useDispatch();
  const movieList = useAppSelector((state) => state.movies.list.moviesList);

  /// ? ***************************************************
  useEffect(() => {
    dispatch(MOVIES_GENRES_GET());
    dispatch(MOVIES_LIST_GET({ query: "" }));
  }, []);

  /// m ***************************************************
  return (
    <div className="flex items-stretch h-[calc(100%-144px)]">
      <div className="h-full overflow-y-auto w-96">
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
          >
            {movie.title}
          </div>
        ))}
      </div>
      <div className="grow bg-amber-700"></div>
    </div>
  );
};

export default Movies;
