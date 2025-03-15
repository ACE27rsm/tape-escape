import axios from "axios";
import config from "../config";

const APIAxios = axios.create({
  baseURL: config.server.url,
  headers: {
    "Content-Type": "application/json",
  },
});

test("server test success route", async () => {
  const { data } = await APIAxios.get("/test");
  expect(data).toEqual({ messsage: "success" });
});

// test("server test error route", async () => {
//   expect(await APIAxios.get("/test/error")).toBe(axios.AxiosError);
// });
