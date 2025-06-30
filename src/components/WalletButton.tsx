// TODO Add wallet connection part.

import React, { useState } from 'react';
import { getProvider } from '../config/web3';

type WalletButtonProps = {
  onConnect: (address: string, provider: any) => void;
};

const WalletButton: React.FC<WalletButtonProps> = ({ onConnect }) => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    // TODO: Implement wallet connection logic
  };

  return (
    <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mb-6 hover:bg-blue-700 transition" onClick={connectWallet}>
      {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
    </button>
  );
};

export default WalletButton;
