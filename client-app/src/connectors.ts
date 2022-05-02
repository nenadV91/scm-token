import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ALL_SUPPORTED_CHAIN_IDS, INFURA_NETWORK_URLS } from "chains";

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: INFURA_NETWORK_URLS,
  qrcode: true,
});

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});
