import { useWeb3React } from "@web3-react/core";
import { useEffect, useState, useCallback } from "react";
import { SUPPORTED_WALLETS } from "constants/wallets";
import { LAST_CONNECTOR_NAME } from "constants/index";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { SupportedWallets } from "constants/wallets";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

function getLastConnector() {
  const lastWalletName = localStorage.getItem(LAST_CONNECTOR_NAME);

  if (!lastWalletName) return null;

  return SUPPORTED_WALLETS[lastWalletName].connector;
}

function setLastConnector(connector: AbstractConnector | undefined) {
  let connectorName = "";

  if (!connector) {
    return;
  } else if (connector instanceof InjectedConnector) {
    connectorName = SupportedWallets.INJECTED;
  } else if (connector instanceof WalletConnectConnector) {
    connectorName = SupportedWallets.WALLET_CONNECT;
  }

  localStorage.setItem(LAST_CONNECTOR_NAME, connectorName);
}

export default function useEagerConnect() {
  const { active, activate, connector: newConnector } = useWeb3React();

  const [tried, setTried] = useState(false);

  const connector = getLastConnector();

  // handle before unload
  const handleBeforeUnload = useCallback(() => {
    if (!active) {
      localStorage.removeItem(LAST_CONNECTOR_NAME);
    } else {
      setLastConnector(newConnector);
    }
  }, [active, newConnector]);

  // handle connecting with Injected connector
  const connectInjected = useCallback(
    (connector: InjectedConnector) => {
      connector.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(connector, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    },
    [activate]
  );

  // handle connection with other Abstract connectors (not Injected)
  const connectAbstract = useCallback(
    (connector: AbstractConnector) => {
      activate(connector, undefined, true).catch(() => {
        setTried(true);
      });
    },
    [activate]
  );

  useEffect(() => {
    if (!connector) {
      setTried(true);
    } else if (connector instanceof InjectedConnector) {
      connectInjected(connector);
    } else if (connector instanceof AbstractConnector) {
      connectAbstract(connector);
    } else {
      setTried(true);
    }
  }, [activate, connectAbstract, connectInjected, connector]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  return tried;
}
