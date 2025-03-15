interface IConfig {
  isProduction: boolean;
  apiURL: string;
  logger: { debugConsole: boolean };
}

const config: IConfig = {
  isProduction: false,
  apiURL: "http://localhost:27027",
  logger: {
    debugConsole: true,
  },
};
// const config: IConfig = {
//   isProduction: process.env.REACT_APP_ENV === "production",
//   apiURL: process.env.REACT_APP_API_URL || "http://localhost:27027",
//   logger: {
//     debugConsole: process.env.REACT_APP_DEBUG_CONSOLE === "true",
//   },
// };

export default config;
