import { SupportedChainId as ChainId } from "constants/chains";
import { Token } from "@uniswap/sdk-core";
import rinkebyAddresses from "../../addresses.json";

// WETH
export const WETH_CONTRACT_ADDRESS: Record<number, string> = {
  [ChainId.RINKEBY]: rinkebyAddresses.weth,
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
  [ChainId.RINKEBY]: rinkebyAddresses.scm,
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
  [ChainId.RINKEBY]: rinkebyAddresses.ico,
};
