const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;

if (typeof INFURA_KEY === "undefined") {
  throw new Error(
    "NEXT_PUBLIC_INFURA_KEY must be a defined environment variable!"
  );
}

export interface NetworkInfo {
  url: string;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export enum SupportedChainId {
  MAINNET = 1,
  RINKEBY = 4,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.RINKEBY,
];

export const CHAIN_ID_TO_NAMES = {
  [SupportedChainId.MAINNET]: "mainnet",
  [SupportedChainId.RINKEBY]: "rinkeby",
};

export const INFURA_NETWORK_URLS = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
};

export type Chains = {
  [key: number]: NetworkInfo;
};

export const CHAINS: Chains = {
  [SupportedChainId.MAINNET]: {
    url: INFURA_NETWORK_URLS[SupportedChainId.MAINNET],
    name: CHAIN_ID_TO_NAMES[SupportedChainId.MAINNET],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  [SupportedChainId.RINKEBY]: {
    url: INFURA_NETWORK_URLS[SupportedChainId.RINKEBY],
    name: CHAIN_ID_TO_NAMES[SupportedChainId.RINKEBY],
    nativeCurrency: {
      name: "Rinkeby Ether",
      symbol: "rETH",
      decimals: 18,
    },
  },
};
