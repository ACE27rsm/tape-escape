import TMDBApi from "../libs/TMDB_API";

test("TMDB - getGenres", async () => {
  const data = await TMDBApi.getGenres();
  expect(data.length).toBeGreaterThan(0);
});

test("TMDB - getMovieList", async () => {
  const data = await TMDBApi.getMovieList(1);
  expect(data.results.length).toBeGreaterThan(0);
  expect(data.page).toBe(1);
  expect(data.total_pages).toBeGreaterThan(0);
  expect(data.total_results).toBeGreaterThan(0);
});

test("TMDB - getMovieDetails", async () => {
  const data = await TMDBApi.getMovieDetails(1212855);
  expect(data).not.toBeNull();
});

test("TMDB - serchMovieByName", async () => {
  const data = await TMDBApi.serchMovieByName("interstellar");
  expect(data.results.length).toBeGreaterThan(0);
  expect(data.page).toBe(1);
  expect(data.total_pages).toBeGreaterThan(0);
  expect(data.total_results).toBeGreaterThan(0);
});
