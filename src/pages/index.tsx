import React, { useState } from "react";
import WalletButton from "../components/WalletButton";
import TokenInput from "../components/TokenInput";
import DexModal from "../components/DexModal";
import { DexQuote } from "../types/dex";
import { Token } from "../types/token";
import { SearchToken } from "../components/SearchToken";

const TOKENS = ["ETH", "USDC"];

export const TOKEN: Token[] = [
  {
    symbol: "ETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    decimal: "18",
  },
  {
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimal: "6",
  },
];

const ROUTERS = [
  "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // UniswapV2
  "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", // SushiswapV2
];

let STATIC_QUOTES: DexQuote[] = [
  {
    fromAmount: 1,
    toAmount: 12.856778,
    minReceive: 12.23939,
    dex: "🦄 UniSwapV2 🦄",
    to: "",
    path: [TOKEN[0], TOKEN[1]],
    deadline: 0,
    router: ROUTERS[0],
  },
  {
    fromAmount: 1,
    toAmount: 12.540362,
    minReceive: 12.1,
    dex: "🍣 SushiSwap 🍣",
    to: "",
    path: [TOKEN[0], TOKEN[1]],
    deadline: 0,
    router: ROUTERS[1],
  },
];

const IndexPage: React.FC = () => {
  const [fromAmount, setFromAmount] = useState(1);
  const [fromToken, setFromToken] = useState("ETH");
  const [toAmount, setToAmount] = useState(0);
  const [toToken, setToToken] = useState("USDC");
  const [quotes, setQuotes] = useState<DexQuote[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(TOKEN);

  const handleFetchQuote = async () => {
    const fetchedQuotes = STATIC_QUOTES.map((quote) => ({
      ...quote,
      fromAmount,
      toAmount: quote.toAmount * fromAmount,
      minReceive: quote.minReceive * fromAmount,
    }));
    setQuotes(fetchedQuotes);
    setToAmount(fetchedQuotes[0].toAmount);
  };

  const handleConnect = (addr: string, prov: any) => {
    setProvider(prov);
    setAddress(addr);
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-md p-8">
      <WalletButton onConnect={handleConnect} />
      <SearchToken tokenList={TOKEN} setFilteredToken={setFilteredTokens} />

      <TokenInput
        label="From"
        value={fromAmount}
        onChange={setFromAmount}
        token={fromToken}
        onTokenChange={setFromToken}
        options={filteredTokens.map((t) => t.symbol)}
      />
      <TokenInput
        label="To"
        value={toAmount}
        onChange={setToAmount}
        token={toToken}
        onTokenChange={setToToken}
        options={TOKENS}
      />
      <button
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-4 mb-2 hover:bg-blue-700 transition"
        onClick={handleFetchQuote}
      >
        1. Fetch Quote
      </button>
      <button
        className={`w-full font-bold py-3 rounded-lg ${
          quotes.length
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-blue-200 text-blue-900 cursor-not-allowed"
        } transition`}
        onClick={() => setModalOpen(true)}
        disabled={quotes.length === 0}
      >
        2. Swap
      </button>

      <DexModal
        open={modalOpen}
        quotes={quotes}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default IndexPage;
