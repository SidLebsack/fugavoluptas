export interface Balance {
  chain: string;
  amount: string;
  symbol: string;
  decimals: number;
  ids?: Array<string>;
}
