import UniversalModel from "../models/index";

class StockDataRepository {
  public stockDataRepository: UniversalModel;

  constructor() {
    this.stockDataRepository = new UniversalModel("StockData");
  }

  async create(column: string, values: string) {
    try {
      const result = await this.stockDataRepository.insert({
        column,
        values,
      });

      return result;
    } catch (e) {
      throw e;
    }
  }

  async findAll(column: string, condition: string) {
    try {
      const result = await this.stockDataRepository.select({
        column,
        condition,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }
}

export default new StockDataRepository();
