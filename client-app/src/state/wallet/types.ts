export enum WalletViews {
  ACCOUNT = "ACCOUNT",
  PENDING = "PENDING",
}

export interface WalletState {
  view: WalletViews;
  pendingError: boolean;
}
