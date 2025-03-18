import moment from "moment";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router";

/// * hooks
import useFetch from "../../hooks/useFetch";

/// * types
import { Movies } from "../../../../types";
import cn from "@/utils/cn";

const History = () => {
  /// y ***************************************************
  const { data, fetching, error } = useFetch("/movies/history");

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100%-137px)] gap-6">
      {fetching && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div className="flex flex-col  w-full h-[calc(100%-137px)] overflow-y-auto !px-4">
          <div className="w-full flex items-center justify-between gap-4 !text-orange-400">
            <div className="flex items-center">
              <FaChevronLeft />
              <Link to="/movies" className="!text-4xl outline-0">
                Back to Movies
              </Link>
            </div>

            {data.length > 0 && (
              <div className="!text-4xl">{data.length} elements found</div>
            )}
          </div>
          {data.length === 0 && (
            <div className="!text-4xl">No rent history</div>
          )}
          {data.length > 0 && (
            <>
              <div className="sticky !bg-orange-400 top-0 flex gap-4 items-center !border-solid !border-b-2 !border-[#8103ff] !p-4">
                <div className="w-10"></div>
                <div className="w-64 truncate grow">
                  <div className="!text-4xl">Title</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-44 truncate">
                    <div className="!text-xl text-center">
                      Rented <br />
                      Date
                    </div>
                  </div>
                  <div className={cn("w-60 truncate text-center")}>
                    <div className="!text-xl text-center">
                      Returned <br />
                      Date
                    </div>
                  </div>
                </div>
              </div>
              {data.map((movie: Movies.UserRentedMovie) => (
                <div
                  key={movie.rentId}
                  className="flex gap-4 items-center !border-solid !border-b-2 !border-[#8103ff] !p-4"
                >
                  <div className="w-10">
                    {movie.poster_path ? (
                      <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="w-full object-cover"
                      />
                    ) : (
                      <div className="!p-2 w-max bg-[#0d253f] rounded-lg h-max">
                        <img
                          src="images/logos/tmdb-logo.svg"
                          alt="tmdb logo"
                          className="!h-5"
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-64 truncate grow">
                    <div className="!text-4xl">{movie.title}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-44 truncate">
                      <div className="!text-4xl">
                        {moment(movie.rentDate).format("DD-MM-YY")}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-60 truncate text-center",
                        movie.returnDate ? "!text-green-400" : "!text-red-400"
                      )}
                    >
                      <div className="!text-4xl">
                        {movie.returnDate
                          ? moment(movie.returnDate).format("DD-MM-YY")
                          : "Not returned"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
