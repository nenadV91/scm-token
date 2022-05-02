export enum ApplicationModal {
  WALLET,
}

export interface ApplicationState {
  openModal: ApplicationModal | null;
  chainId: number | null;
  blockNumber: { readonly [chainId: number]: number };
}
