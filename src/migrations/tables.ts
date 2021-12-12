import db from "../config/pool";
import { logger } from "../utils/index";

const stockData = `
  DROP TABLE IF EXISTS StockData CASCADE;
  CREATE TABLE StockData(
   id SERIAL PRIMARY KEY,
   ticker_name VARCHAR(50) NOT NULL,
   cost NUMERIC NOT NULL,
   gain NUMERIC NOT NULL,
   percentage_performance NUMERIC NOT NULL,
   timestamp NUMERIC NOT NULL,
   created_at DATE NOT NULL DEFAULT CURRENT_DATE
  );`;

(async function migrate() {
  try {
    await db.query(`${stockData}`);

    logger.info("migration:database Table created");

    process.exit();
  } catch (err: any) {
    logger.error(`migration-error:database ${err.message}: Table not created`);

    process.exit(1);
  }
})();
