import { SupportedChainId as ChainId } from "constants/chains";
import { Token } from "@uniswap/sdk-core";

// WETH
export const WETH_CONTRACT_ADDRESS: Record<number, string> = {
  [ChainId.RINKEBY]: "0x1eA4E8dbbeFFB02b06206Cb5646A544c155538A9",
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
  [ChainId.RINKEBY]: "0x4d3915A4FD5f2DC44A51F61f18A7c8cCb6904e65",
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
  [ChainId.RINKEBY]: "0xeCD1E3Ad1e2D4d6EbE5A0868224AD2331B5206C4",
};
