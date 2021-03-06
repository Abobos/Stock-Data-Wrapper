export interface TickerDetails {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik: string;
  composite_figi: string;
  share_class_figi: string;
  last_updated_utc: Date;
}

export interface TickersResult {
  results: TickerDetails[];
  status: string;
  request_id: string;
  count: number;
  next_url: string;
}

export interface GroupedData {
  T: string;
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}

export interface GroupedDataResult {
  results: GroupedData[];
  queryCount: number;
  resultsCount: number;
  adjusted: true;
  status: string;
  request_id: string;
  count: number;
}

export interface TransformedGroupData extends GroupedData {
  d: number;
  p: number;
}

export interface OpenCloseStockDataResult {
  status: string;
  from: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  afterHours: number;
  preMarket: number;
}

export interface PreviousCloseData {
  T: string;
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}

export interface PreviousCloseResult {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: PreviousCloseData[];
  status: string;
  request_id: string;
  count: number;
}
