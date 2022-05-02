import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useModalOpen } from "state/app/hooks";
import { ApplicationModal } from "state/app/types";
import { useSetModalOpen } from "state/app/hooks";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useEffect, useCallback } from "react";
import usePrevious from "hooks/usePrevious";
import { SUPPORTED_WALLETS } from "constants/wallets";
import {
  useSetWalletError,
  useSetWalletView,
  useWalletView,
  useWalletError,
  useTryActivation,
} from "state/wallet/hooks";
import { WalletViews } from "state/wallet/types";

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme?.shadows[4]};
  padding: ${({ theme }) => theme.spacing(2)};
`;

const SpinnerWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 25px;
`;

const ErrorText = styled(Typography)`
  color: ${({ theme }) => theme.palette.error.main};
`;

export default function WalletModal() {
  const { error, active, account, connector } = useWeb3React();

  const isModalOpen = useModalOpen(ApplicationModal.WALLET);
  const walletView = useWalletView();
  const walletError = useWalletError();

  const setWalletError = useSetWalletError();
  const setWalletView = useSetWalletView();
  const closeModal = useSetModalOpen(null);
  const tryActivation = useTryActivation();

  const previousAccount = usePrevious(account);
  const previousConnector = usePrevious(connector);

  useEffect(() => {
    if (isModalOpen) {
      setWalletView(WalletViews.ACCOUNT);
      setWalletError(false);
    }
  }, [isModalOpen, setWalletError, setWalletView]);

  useEffect(() => {
    if (
      isModalOpen &&
      account !== previousAccount &&
      connector !== previousConnector &&
      !error
    ) {
      setWalletView(WalletViews.ACCOUNT);
      closeModal();
    }
  }, [
    account,
    closeModal,
    connector,
    error,
    isModalOpen,
    previousAccount,
    previousConnector,
    setWalletView,
  ]);

  const getModalContent = useCallback(() => {
    if (error) {
      if (error instanceof UnsupportedChainIdError) {
        return (
          <Typography mb={2} variant="subtitle1">
            Unsuppported chain! Please switch the network!
          </Typography>
        );
      }
    }

    return walletView === WalletViews.PENDING ? (
      <SpinnerWrapper>
        <CircularProgress />
      </SpinnerWrapper>
    ) : (
      Object.entries(SUPPORTED_WALLETS).map(([key, { connector, name }]) => (
        <Button
          fullWidth
          key={key}
          sx={{ marginBottom: "10px" }}
          onClick={() => tryActivation(connector)}
          variant="contained"
        >
          {name}
        </Button>
      ))
    );
  }, [error, tryActivation, walletView]);

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <Typography mb={2} variant="subtitle1">
            {active ? "Change Wallet" : "Connect Wallet"}
          </Typography>

          {walletError || error ? (
            <ErrorText mb={2} variant="subtitle1">
              Error connecting to the wallet! Please try again.
            </ErrorText>
          ) : null}

          <div>{getModalContent()}</div>
        </ModalContent>
      </Modal>
    </div>
  );
}
