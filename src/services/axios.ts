import axios from "axios";

import configuration from "@config/configuration";

import { logger } from "@utils/logger";

import { ObjectProps } from "./types";
import { CustomError, InternalServerError } from "@exceptions/index";
import { response } from "express";

class Axios {
  private API_BASE_URL: string;
  private API_KEY: string;

  constructor() {
    this.API_BASE_URL = configuration().Polygon.url;
    this.API_KEY = configuration().Polygon.key;
  }

  public async get(
    endpoint: string,
    queryParams: ObjectProps
  ): Promise<ObjectProps> {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
        },
        params: {
          ...queryParams,
        },
      };

      const { data } = await axios.get<ObjectProps>(
        `${this.API_BASE_URL}/${endpoint}`,
        options
      );

      return data;
    } catch (error: any) {
      console.log(error.response);

      logger.error(
        `An error occurred from calling stock API ${JSON.stringify(
          error.response.statusText
        )}`
      );
    }
  }
}

export const axiosInstance = new Axios();
