import React, { useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/// * hooks
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";

/// * compoents
import { IconButton } from "../../components/ui/button";

/// * actions
import {
  MOVIES_LIST_GET,
  MOVIES_LIST_GET_DEBOUNCED,
} from "../../store/actions";
import { Input } from "../../components/ui/input";

const MoviesHeader = () => {
  /// y ***************************************************
  const page = useAppSelector((state) => state.movies.list.page);
  const query = useAppSelector((state) => state.movies.list.query);
  const totalPages = useAppSelector((state) => state.movies.list.totalPages);
  const dispatch = useAppDispatch();

  /// + ***************************************************
  const handleChangePage = useCallback(
    (page: number) => {
      dispatch(MOVIES_LIST_GET({ page, query }));
    },
    [dispatch, query]
  );

  /// + ***************************************************
  const handleSearch = useCallback(
    (query: string) => {
      dispatch(MOVIES_LIST_GET_DEBOUNCED({ page: 1, query }));
    },
    [dispatch]
  );

  /// m ***************************************************
  return (
    <div className="w-full flex items-center justify-between !p-2 !px-6">
      <div className="gap-4 flex items-center">
        <IconButton
          disabled={page === 1}
          onClick={() => handleChangePage(page - 1)}
        >
          <FaChevronLeft />
        </IconButton>
        <div className="!text-4xl">
          {page} / {totalPages}
        </div>
        <IconButton
          disabled={page === totalPages}
          onClick={() => handleChangePage(page + 1)}
        >
          <FaChevronRight />
        </IconButton>
      </div>

      <div className="">
        <Input
          InputProps={{
            placeholder: "Search",
          }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default MoviesHeader;
