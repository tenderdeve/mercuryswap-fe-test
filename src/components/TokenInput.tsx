import React from "react";

interface TokenInputProps {
  label: string;
  value: number | string;
  onChange: (val: number) => void;
  token: string;
  onTokenChange: (val: string) => void;
  options: string[];
}

const TokenInput: React.FC<TokenInputProps> = ({
  label,
  value,
  onChange,
  token,
  onTokenChange,
  options,
}) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <div className="flex gap-2">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-28 px-2 py-1 border rounded-lg"
      />
      <select
        value={token}
        onChange={(e) => onTokenChange(e.target.value)}
        className="px-2 py-1 border rounded-lg"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default TokenInput;
