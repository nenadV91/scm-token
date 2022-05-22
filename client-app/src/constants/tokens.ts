import { SupportedChainId as ChainId } from "constants/chains";
import { Token } from "@uniswap/sdk-core";

// WETH
export const WETH_CONTRACT_ADDRESS: Record<number, string> = {
  [ChainId.RINKEBY]: "0x5B4b3d3e53319a9f57FE62be636b5B76bF8f9A2E",
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
  [ChainId.RINKEBY]: "0xdf9E9fd580cae425D821024A99DA855E95fF6F59",
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
  [ChainId.RINKEBY]: "0xEb426631029e318F96e0F85290048D128A61E928",
};
