import { Token } from "./token";

export type Dex = {
  id: string;
  name: string;
};

export interface DexQuote {
  fromAmount: number;
  toAmount: number;
  minReceive: number;
  path: Token[];
  to: string;
  deadline: number;
  dex: string;
  router: string;
}
