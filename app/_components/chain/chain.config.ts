export interface ChainConfig {
  id: string;
  name: string;
  chainId: number;
  icon?: string;
}

export const SUPPORTED_CHAINS: ChainConfig[] = [
  { id: "eip155:1", name: "Ethereum", chainId: 1 },
  { id: "eip155:8453", name: "Base", chainId: 8453 },
  { id: "eip155:42161", name: "Arbitrum One", chainId: 42161 },
  { id: "eip155:421614", name: "Arbitrum Sepolia", chainId: 421614 },
  { id: "eip155:84532", name: "Base Sepolia", chainId: 84532 },
  { id: "eip155:666666666", name: "Degen", chainId: 666666666 },
  { id: "eip155:100", name: "Gnosis", chainId: 100 },
  { id: "eip155:10", name: "Optimism", chainId: 10 },
  { id: "eip155:11155420", name: "Optimism Sepolia", chainId: 11155420 },
  { id: "eip155:137", name: "Polygon", chainId: 137 },
  { id: "eip155:11155111", name: "Ethereum Sepolia", chainId: 11155111 },
  { id: "eip155:7777777", name: "Zora", chainId: 7777777 },
  { id: "eip155:130", name: "Unichain", chainId: 130 },
  { id: "eip155:10143", name: "Monad Testnet", chainId: 10143 },
  { id: "eip155:42220", name: "Celo", chainId: 42220 },
  { id: "eip155:999", name: "HyperEVM", chainId: 999 },
];

export const DEFAULT_CHAIN = "eip155:8453"; // Base mainnet

export const getChainById = (chainId: string): ChainConfig | undefined => {
  return SUPPORTED_CHAINS.find((chain) => chain.id === chainId);
};

export const getChainByNumber = (chainId: number): ChainConfig | undefined => {
  return SUPPORTED_CHAINS.find((chain) => chain.chainId === chainId);
};
