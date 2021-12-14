import axios from "axios";

import configuration from "../config/configuration";

import { logger } from "../utils/logger";

import { ObjectProps } from "./types";
import { CustomError } from "../exceptions/index";

class Axios {
  private API_BASE_URL: string;
  private API_KEY: string;

  constructor() {
    this.API_BASE_URL = configuration().Polygon.url;
    this.API_KEY = configuration().Polygon.key;
  }

  public async get<T>(endpoint: string, queryParams: ObjectProps): Promise<T> {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
        },
        params: {
          ...queryParams,
        },
      };

      const { data } = await axios.get(
        `${this.API_BASE_URL}/${endpoint}`,
        options
      );

      return data;
    } catch (error: any) {
      logger.error(
        `An error occurred from calling stock API ${JSON.stringify(error)}`
      );

      throw new CustomError(error.response?.statusText, error.response?.status);
    }
  }
}

export const axiosInstance = new Axios();
