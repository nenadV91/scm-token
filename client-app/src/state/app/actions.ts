import { createAction } from "@reduxjs/toolkit";
import { ApplicationModal } from "./types";

export const setOpenModal = createAction<ApplicationModal | null>(
  "app/setOpenModal"
);

export const updateChainId = createAction<number | null>("app/updateChainId");

export const updateBlockNumber = createAction<{
  chainId: number;
  blockNumber: number;
}>("app/updateBlockNumber");
