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

test("server auth login route", async () => {
  const response = await APIAxios.post("/auth/login", {
    username: "pjfry",
    password: "password",
  });

  console.log(response);
});
