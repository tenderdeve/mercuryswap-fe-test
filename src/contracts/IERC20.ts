export const IERC20 = [
    "function approve(address _spender, uint256 _value) public returns (bool)",
    "function transfer(address _to, uint256 _value) public returns (bool)",
    "function transferFrom(address _from, address _to, uint256 _value) public returns (bool)",
    "function balanceOf(address _owner) public view returns (uint256)",
    "function allowance(address _owner, address _spender) public view returns (uint256)",
    "event Transfer(address indexed _from, address indexed _to, uint256 _value)",
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)",
    "function decimals() public view returns (uint8)",
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function totalSupply() public view returns (uint256)"
]

export const IWETH = [
    "function deposit() external payable",
    "function withdraw(uint256) external"
]