/**
 * A modal component for selecting a decentralized exchange (DEX) from a list.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {boolean} props.open - Determines whether the modal is open or not.
 * @param {Array<{ id: string; name: string }>} props.dexes - The list of DEX options to display.
 * @param {{ id: string; name: string }} props.selected - The currently selected DEX.
 * @param {(dex: { id: string; name: string }) => void} props.onSelect - Callback function triggered when a DEX is selected.
 * @param {() => void} props.onClose - Callback function triggered when the modal is closed.
 * @param {string} props.title - The title displayed at the top of the modal.
 *
 * @returns {JSX.Element | null} The rendered modal component, or `null` if `open` is `false`.
 */

import React, { useState } from "react";
import { DexQuote } from "../types/dex";
import { generateSwapTxData, executeSwapTransaction, swapTokens } from "../services/dexService";
import { ethers } from "ethers";

interface DexModalProps {
  open: boolean;
  quotes: DexQuote[];
  onClose: () => void;
}

const DexModal: React.FC<DexModalProps> = ({ open, quotes, onClose }) => {
  const [selected, setSelected] = useState<DexQuote | null>(null);
  const [step, setStep] = useState(1);
  const [hasGeneratedTxData, setHasGeneratedTxData] = useState(false);

  if (!open) return null;

  // Reset modal state when closed or new DEX is selected
  const handleClose = () => {
    setStep(1);
    setSelected(null);
    setHasGeneratedTxData(false);
    onClose();
  };

  const generateTxData = () => {
    setHasGeneratedTxData(true);
    // TODO Generate tx data
  }

  const confirmTrade = async () => {
    // TODO execute the trade
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        {step === 1 && (
          <>
            <h3 className="text-lg font-semibold mb-4">Select DEX you want to trade</h3>
            <ul className="space-y-2">
              {quotes.map((q, i) => (
                <li
                  key={i}
                  className={`border rounded-lg p-3 cursor-pointer hover:bg-blue-50 transition ${
                    selected?.dex === q.dex ? "bg-blue-100 border-blue-400" : "border-gray-200"
                  }`}
                  onClick={() => {
                    setSelected(q);
                    setStep(2);
                    setHasGeneratedTxData(false);
                  }}
                >
                  <div className="text-sm">From Amount: <span className="font-mono">{q.fromAmount}</span></div>
                  <div className="text-sm">To Amount: <span className="font-mono">{q.toAmount}</span></div>
                  <div className="text-sm">Min Receive: <span className="font-mono">{q.minReceive}</span></div>
                  <div className="text-sm">To Address: <span className="font-mono">{q.to}</span></div>
                  <div className="text-sm">swap path: <span className="font-mono">{[q.path[0].symbol, " -> ", q.path[1].symbol]}</span></div>
                  <div className="text-sm">deadline: <span className="font-mono">{q.deadline}</span></div>
                  <div className="text-xs text-gray-600">DEX: {q.dex}</div>
                </li>
              ))}
            </ul>
          </>
        )}
        {step === 2 && selected && (
          <>
            <div className="mb-4">
              <div className="text-sm text-gray-500">Selected DEX:</div>
              <div className="font-semibold">{selected.dex}</div>
            </div>
            <div className="mb-2 text-sm">From: {selected.fromAmount}</div>
            <div className="mb-2 text-sm">To: {selected.toAmount}</div>
            <div className="mb-4 text-sm">Min Receive: {selected.minReceive}</div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mb-2 hover:bg-blue-700 transition"
              onClick={generateTxData}
              disabled={hasGeneratedTxData}
            >
              3. Generate tx data
            </button>
            <button
              className={`w-full py-2 rounded-lg font-semibold transition ${
                hasGeneratedTxData
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-200 text-blue-900 cursor-not-allowed"
              }`}
              onClick={async () => {
                await confirmTrade();
                handleClose();
                alert("Trade confirmed!");
              }}
              disabled={!hasGeneratedTxData}
            >
              4. Confirm trade
            </button>
          </>
        )}
        <button
          className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DexModal;
