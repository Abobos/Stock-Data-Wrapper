import db from "../config/pool";

import { queryParamsII, queryParamsIII } from "../interfaces";
import { logger } from "../utils";

class UniversalModel {
  private resource: string;

  constructor(table: string) {
    this.resource = table;
  }

  async insert(queryDetails: queryParamsII): Promise<any> {
    const queryStatement = `INSERT INTO ${this.resource} (${queryDetails.column}) 
                            VALUES (${queryDetails.values}) RETURNING *`;
    logger.info(queryStatement);

    const { rows } = await db.query(queryStatement);

    return rows[0];
  }

  async select(queryDetails: queryParamsIII): Promise<any> {
    const queryStatement = `SELECT ${queryDetails.column} FROM ${this.resource}
                            WHERE ${queryDetails.condition}`;
    logger.info(queryStatement);

    const { rows } = await db.query(queryStatement);

    return rows;
  }
}

export default UniversalModel;
