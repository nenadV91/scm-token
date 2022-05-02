import { setOpenModal } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { ApplicationModal } from "./types";
import { useWeb3React } from "@web3-react/core";

import { AppState } from "state/store";

export function useSetModalOpen(payload: ApplicationModal | null) {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(setOpenModal(payload)),
    [dispatch, payload]
  );
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector((state: AppState) => state.app.openModal);
  return openModal === modal;
}

export function useBlockNumber(): number | undefined {
  const { chainId } = useWeb3React();

  return useSelector((state: AppState) => state.app.blockNumber[chainId ?? -1]);
}
