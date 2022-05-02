import { createReducer } from "@reduxjs/toolkit";
import { setWalletError, setWalletView } from "./actions";
import { WalletState, WalletViews } from "./types";

const initialState: WalletState = {
  view: WalletViews.ACCOUNT,
  pendingError: false,
};

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(setWalletView, (state, { payload }) => {
      state.view = payload;
    })
    .addCase(setWalletError, (state, { payload }) => {
      state.pendingError = payload;
    });
});
