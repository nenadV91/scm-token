import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { LAST_CONNECTOR_NAME } from "constants/index";

export default function WalletUpdater(): null {
  const { connector } = useWeb3React();

  useEffect(() => {
    if (connector instanceof WalletConnectConnector) {
      const wc = connector.walletConnectProvider.signer.connection.wc;

      wc.on("disconnect", () => {
        if (connector) {
          connector.close();
          localStorage.removeItem(LAST_CONNECTOR_NAME);
        }
      });
    }
  }, [connector]);

  return null;
}
