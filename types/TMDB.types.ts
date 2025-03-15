export namespace TMDB {
  export interface Movie {
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    genre_ids: number[];
  }

  export interface MovieList {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }

  export interface Genre {
    id: number;
    name: string;
  }

  export interface Country {
    iso_3166_1: string;
    name: string;
  }

  export interface Spoken_Language {
    english_name: string;
    iso_639_1: string;
    name: string;
  }

  export interface MovieDetails extends Movie {
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    production_companies: [];
    production_countries: Country[];
    revenue: number;
    runtime: number;
    spoken_languages: Spoken_Language[];
    status: string;
    tagline: string;
  }
}
