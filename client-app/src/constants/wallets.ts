import { AbstractConnector } from "@web3-react/abstract-connector";
import { injected, walletconnect } from "connectors";

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
}

export enum SupportedWallets {
  INJECTED = "INJECTED",
  WALLET_CONNECT = "WALLET_CONNECT",
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  [SupportedWallets.INJECTED]: {
    connector: injected,
    name: "Injected",
  },
  [SupportedWallets.WALLET_CONNECT]: {
    connector: walletconnect,
    name: "WalletConnect",
  },
};
