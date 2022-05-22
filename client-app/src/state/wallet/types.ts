export enum WalletViews {
  ACCOUNT = "ACCOUNT",
  PENDING = "PENDING",
}

export interface WalletState {
  view: WalletViews;
  error: null | string;
}
