// TODO: Add web3 integration part.

import { Dex } from "../types/dex";

type Props = {
  open: boolean;
  sourceDex: Dex;
  destinationDex: Dex;
  expectedAmount: number | null;
  step: number;
  onShowSourceDex: () => void;
  onShowDestinationDex: () => void;
  onGenerateTx: () => void;
  onConfirmTrade: () => void;
  onClose: () => void;
};

/**
 * A modal component for displaying and managing a quote for a trade between two DEXs (Decentralized Exchanges).
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {boolean} props.open - Determines whether the modal is open or not.
 * @param {Object} props.sourceDex - The selected source DEX object.
 * @param {string} props.sourceDex.name - The name of the source DEX.
 * @param {Object} props.destinationDex - The selected destination DEX object.
 * @param {string} props.destinationDex.name - The name of the destination DEX.
 * @param {string | number} props.expectedAmount - The expected amount for the trade.
 * @param {number} props.step - The current step in the trade process.
 * @param {Function} props.onShowSourceDex - Callback function to show the source DEX list.
 * @param {Function} props.onShowDestinationDex - Callback function to show the destination DEX list.
 * @param {Function} props.onGenerateTx - Callback function to generate transaction data.
 * @param {Function} props.onConfirmTrade - Callback function to confirm the trade.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @returns {JSX.Element | null} The rendered modal component or null if `open` is false.
 */
export default function QuoteModal({
  open, sourceDex, destinationDex, expectedAmount, step,
  onShowSourceDex, onShowDestinationDex, onGenerateTx, onConfirmTrade, onClose
}: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="mb-2">
          <div><b>Selected Source DEX:</b> {sourceDex.name}</div>
          <div><b>Selected Destination DEX:</b> {destinationDex.name}</div>
          <div className="my-2"><b>Expected Amount:</b> {expectedAmount}</div>
        </div>
        <button className="w-full bg-blue-600 text-white rounded py-2 mb-2" onClick={onShowSourceDex}>
          Show Source DEX List
        </button>
        <button className="w-full bg-blue-600 text-white rounded py-2 mb-2" onClick={onShowDestinationDex}>
          Show Destination DEX List
        </button>
        <button className={`w-full rounded py-2 mb-2 ${step === 3 ? "bg-blue-300" : "bg-blue-600 text-white"}`} onClick={onGenerateTx} disabled={step >= 3}>
          3. Generate tx data
        </button>
        <button className={`w-full rounded py-2 mb-2 ${step === 4 ? "bg-blue-300" : "bg-blue-600 text-white"}`} onClick={onConfirmTrade} disabled={step < 3 || step >= 4}>
          4. Confirm trade
        </button>
        <button className="w-full bg-gray-200 rounded py-2 mt-2" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}