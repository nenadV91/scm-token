import { useCallback } from "react";
import Button from "@mui/material/Button";
import { useSetModalOpen } from "state/app/hooks";
import { ApplicationModal } from "state/app/types";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { shortenAddress } from "utils";
import { styled } from "@mui/system";
import { useWalletError } from "state/wallet/hooks";

const StyledButton = styled(Button)`
  margin-left: auto;
`;

export default function Web3Status() {
  const openModal = useSetModalOpen(ApplicationModal.WALLET);
  const walletError = useWalletError();

  const { account, error } = useWeb3React();

  const getContent = useCallback(() => {
    if (account) {
      return shortenAddress(account);
    } else if (walletError) {
      return walletError;
    } else if (error) {
      if (error instanceof UnsupportedChainIdError) {
        return "Unsupported chain id";
      } else {
        return "Something went wrong";
      }
    } else {
      return "Connect Wallet";
    }
  }, [account, error, walletError]);

  return (
    <StyledButton onClick={openModal} variant="outlined" color="inherit">
      {getContent()}
    </StyledButton>
  );
}
