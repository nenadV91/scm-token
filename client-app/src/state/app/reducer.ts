import { createReducer } from "@reduxjs/toolkit";
import { setOpenModal, updateBlockNumber, updateChainId } from "./actions";
import { ApplicationState } from "./types";

const initialState: ApplicationState = {
  openModal: null,
  chainId: null,
  blockNumber: {},
};

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(setOpenModal, (state, { payload }) => {
      state.openModal = payload;
    })
    .addCase(updateChainId, (state, { payload }) => {
      state.chainId = payload;
    })
    .addCase(
      updateBlockNumber,
      (state, { payload: { blockNumber, chainId } }) => {
        if (typeof state.blockNumber[chainId] !== "number") {
          state.blockNumber[chainId] = blockNumber;
        } else {
          state.blockNumber[chainId] = Math.max(
            blockNumber,
            state.blockNumber[chainId]
          );
        }
      }
    );
});
