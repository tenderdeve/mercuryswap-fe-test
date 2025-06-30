import React, { useState, useEffect } from "react";
import { Token } from "../types/token";

interface SearchTokenProps {
  tokenList: Token[];
  setFilteredToken: (tokens: Token[]) => void;
}

export const SearchToken: React.FC<SearchTokenProps> = ({
  tokenList,
  setFilteredToken,
}) => {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchedTerm.trim() === "") {
      setFilteredToken(tokenList);
      setShowMessage(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(() => {
      const lower = searchedTerm.toLowerCase();
      const filtered = tokenList.filter(
        (token) =>
          token.symbol.toLowerCase() === lower ||
          token.address.toLowerCase() === lower ||
          token.decimal.toLowerCase() === lower
      );

      setFilteredToken(filtered);
      setShowMessage(filtered.length === 0);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchedTerm, tokenList, setFilteredToken]);

  return (
    <div className="mb-4">
      <input
        placeholder="Search by symbol, address, or decimals"
        value={searchedTerm}
        onChange={(e) => setSearchedTerm(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      {loading && (
        <div className="text-sm text-blue-500 mt-1">Searching...</div>
      )}
      {!loading && showMessage && (
        <div className="text-sm text-red-500 mt-1">
          No tokens available right now for the searched term.
        </div>
      )}
    </div>
  );
};
