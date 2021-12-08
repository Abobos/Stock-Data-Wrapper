import "dotenv/config";

export interface Configuration {
  Polygon: {
    url: string;
    key: string;
  };
}

export default (): Configuration => ({
  Polygon: {
    url: process.env.STOCK_DATA_API_BASE_URL,
    key: process.env.STOCK_DATA_API_KEY,
  },
});
