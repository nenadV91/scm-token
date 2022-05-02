import { setWalletView, setWalletError } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { WalletViews } from "./types";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AppState } from "state/store";
import usePrevious from "hooks/usePrevious";
import { useWeb3React } from "@web3-react/core";

export function useSetWalletView() {
  const dispatch = useDispatch();
  return useCallback(
    (payload: WalletViews) => dispatch(setWalletView(payload)),
    [dispatch]
  );
}

export function useWalletView(): WalletViews {
  return useSelector((state: AppState) => state.wallet.view);
}

export function useSetWalletError() {
  const dispatch = useDispatch();
  return useCallback(
    (payload: boolean) => dispatch(setWalletError(payload)),
    [dispatch]
  );
}

export function useWalletError(): boolean {
  return useSelector((state: AppState) => state.wallet.pendingError);
}

export function useTryActivation() {
  const { activate, connector } = useWeb3React();

  const setWalletError = useSetWalletError();
  const setWalletView = useSetWalletView();
  const previousConnector = usePrevious(connector);

  return useCallback(
    async (connector: AbstractConnector | undefined) => {
      if (connector !== previousConnector) {
        setWalletView(WalletViews.PENDING);
        setWalletError(false);
      }

      if (connector instanceof WalletConnectConnector) {
        connector.walletConnectProvider = undefined;
      }

      if (connector) {
        activate(connector, undefined, true).catch((error) => {
          console.log("Error connecting to wallet", error);
          setWalletError(true);
          setWalletView(WalletViews.ACCOUNT);
        });
      }
    },
    [activate, previousConnector, setWalletError, setWalletView]
  );
}
