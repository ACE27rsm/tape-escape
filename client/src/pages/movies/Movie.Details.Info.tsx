import { Badge } from "@chakra-ui/react";
import { useMemo } from "react";

/// * types
import { Movies } from "../../../../types";

/// * components
import VHS from "./Movies.Details.Info.VHS";

/// * utils
import cn from "../../utils/cn";
import RentButton from "./Movie.Details.Info.RentButton";

/// g ************************************************
const Row = (props: {
  label?: string;
  value: string;
  valueClassName?: string;
}) => {
  return (
    <div className="flex justify-between gap-8 !border-b-2 !border-solid !border-white !text-2xl">
      {props.label && (
        <div className="!font-bold w-32 lg:w-60 shrink">{props.label}</div>
      )}

      <div className={cn(props.valueClassName)}>{props.value}</div>
    </div>
  );
};

const MovieDetailsInfo = ({
  movieSelected,
}: {
  movieSelected: Movies.MovieDetails;
}) => {
  /// o ***************************************************
  const score = useMemo(() => {
    let score = "⭐";

    if (movieSelected?.vote_average) {
      for (let i = 0; i < Math.ceil(movieSelected.vote_average); i++) {
        score += "⭐";
      }
    }

    return score;
  }, [movieSelected?.vote_average]);

  /// m ************************************************
  return (
    <div
      className="relative"
      style={{
        backgroundImage: movieSelected.backdrop_path
          ? `url(${movieSelected.backdrop_path})`
          : "unset",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="!z-10 h-full !p-8 !text-white bg-[#ffcc0055]">
        <div className="!mb-2">
          <h3 className="font-bold !text-6xl truncate">
            {movieSelected.title}
          </h3>

          {movieSelected.genres.length > 0 && (
            <div className="flex gap-4">
              {movieSelected.genres.map((genre) => (
                <Badge key={genre.id} className="!text-2xl">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-4 flex-col items-center xl:flex-row xl:items-start">
          <VHS poster_path={movieSelected.poster_path} />

          <div className="w-full xl:w-[calc(100%-300px)]">
            <RentButton movieSelected={movieSelected} />

            {movieSelected.vote_count !== undefined &&
              movieSelected.vote_count > 0 && (
                <>
                  <Row label="Score" value={score} />
                  <Row
                    label="Number of Reviews"
                    value={movieSelected.vote_count.toString()}
                  />
                </>
              )}
            <Row
              label="Original Title"
              value={movieSelected.original_title}
              valueClassName="pre-wrap"
            />
            <Row label="Release Date" value={movieSelected.release_date} />
            <Row label="Overview" value={movieSelected.overview} />
            <Row label="Tag Line" value={movieSelected.tagline} />
            <Row label="Runtime" value={`${movieSelected.runtime}'`} />
            <Row label="IMDB Id" value={movieSelected.imdb_id} />
            <Row
              valueClassName="truncate max-w-full"
              value={movieSelected.homepage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsInfo;
