import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export default function getConnectorType(provider: AbstractConnector) {
  if (provider instanceof InjectedConnector) {
    return "Metamask";
  } else if (provider instanceof WalletConnectConnector) {
    return "WalletConnect";
  } else {
    return "";
  }
}
