import { createAction } from "@reduxjs/toolkit";
import { WalletViews } from "./types";

export const setWalletView = createAction<WalletViews>("app/setWalletView");

export const setWalletError = createAction<boolean>("app/setWalletError");
