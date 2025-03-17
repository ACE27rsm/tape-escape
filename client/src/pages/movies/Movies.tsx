import { useDispatch } from "react-redux";
import { useEffect } from "react";

/// * components
import { Button } from "../../components/ui/button";

/// * actions
import { MOVIES_LIST_GET, MOVIES_GENRES_GET } from "../../store/actions";

const Movies = () => {
  /// y ***************************************************
  const dispatch = useDispatch();

  /// ? ***************************************************
  useEffect(() => {
    dispatch(MOVIES_GENRES_GET());
    dispatch(MOVIES_LIST_GET({ query: "" }));
  }, []);

  /// m ***************************************************
  return (
    <div className="flex items-stretch min-h-dvh">
      <div className="h-full overflow-y-auto w-96">CIAO</div>
      <div className="grow bg-amber-700"></div>
    </div>
  );
};

export default Movies;
