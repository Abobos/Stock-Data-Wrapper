import db from "../config/pool";
import { logger } from "../utils/index";

const stocks = `
  DROP TABLE IF EXISTS Stocks CASCADE;
  CREATE TABLE Stocks(
   
  );`;

const stockTickers = `
  DROP TABLE IF EXISTS StockTickers CASCADE;
  CREATE TABLE StockTickers(
  );`;

(async function migrate() {
  try {
    await db.query(`${stocks} ${stockTickers}`);

    logger.info("migration:database Table created");

    process.exit();
  } catch (err: any) {
    logger.error(`migration-error:database ${err.message}: Table not created`);

    process.exit(1);
  }
})();
