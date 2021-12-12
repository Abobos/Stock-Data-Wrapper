import { envrionmentDetails } from "../interfaces";

export const envDatabaseSettings = (env: string): envrionmentDetails => {
  let config = {
    envVariable: "",
    dialect: "postgres",
  };

  env === "production"
    ? (config.envVariable = "DATABASE_URL_PROD")
    : (config.envVariable = "DATABASE_URL_DEV");

  return config;
};
