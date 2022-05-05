import { SupportedChainId as ChainId } from "constants/chains";
import { Token } from "@uniswap/sdk-core";

// WETH
export const WETH_CONTRACT_ADDRESS: Record<number, string> = {
  [ChainId.RINKEBY]: "0x63247c1e61a458757ED86Ef407437B6dd56080Fb",
};

const WETH_TOKEN_RINKEBY = new Token(
  ChainId.RINKEBY,
  WETH_CONTRACT_ADDRESS[ChainId.RINKEBY] || "",
  18,
  "WETH",
  "Wrapped Ether"
);

export const WETH: Record<number, Token> = {
  [ChainId.RINKEBY]: WETH_TOKEN_RINKEBY,
};

// SCM
export const SCM_CONTRACT_ADDRESS: Record<number, string> = {
  [ChainId.RINKEBY]: "0xEE11BEd818ea4351508fd50Ba5d9BcB137c7D5Db",
};

const SCM_TOKEN_RINKEBY = new Token(
  ChainId.RINKEBY,
  SCM_CONTRACT_ADDRESS[ChainId.RINKEBY] || "",
  18,
  "SCM",
  "Scam Token"
);

export const SCM: Record<number, Token> = {
  [ChainId.RINKEBY]: SCM_TOKEN_RINKEBY,
};

// ICO

export const ICO_COTRACT_ADDRESS: Record<number, string> = {
  [ChainId.RINKEBY]: "0x780C0fF027A8b429E81FDA80914d00a6E9D7DdaC",
};
