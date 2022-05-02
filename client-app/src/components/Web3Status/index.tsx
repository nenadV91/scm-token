import { useCallback } from "react";
import Button from "@mui/material/Button";
import { useSetModalOpen } from "state/app/hooks";
import { ApplicationModal } from "state/app/types";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { shortenAddress } from "utils";
import { styled } from "@mui/system";

const StyledButton = styled(Button)`
  margin-left: auto;
`;

export default function Web3Status() {
  const openModal = useSetModalOpen(ApplicationModal.WALLET);

  const { account, error } = useWeb3React();

  const getContent = useCallback(() => {
    if (account) {
      return shortenAddress(account);
    } else if (error) {
      if (error instanceof UnsupportedChainIdError) {
        return "Unsupported Chain";
      } else {
        return "Something went wrong";
      }
    } else {
      return "Connect Wallet";
    }
  }, [account, error]);

  return (
    <StyledButton onClick={openModal} variant="outlined" color="inherit">
      {getContent()}
    </StyledButton>
  );
}
