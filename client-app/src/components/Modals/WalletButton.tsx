import * as React from "react";
import Button from "@mui/material/Button";
import { useWeb3React } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";

type WalletButtonProps = {
  connector: AbstractConnector | undefined;
  setPendingError: (hasError: boolean) => void;
  name: string;
};

export default function WalletConnect({
  connector,
  name,
  setPendingError,
}: WalletButtonProps) {
  const { activate } = useWeb3React();

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    if (connector) {
      activate(connector, undefined, true).catch((error) => {
        setPendingError(true);
        console.log("Error connecting to wallet", error);
      });
    }
  };

  return (
    <Button
      fullWidth
      sx={{ marginBottom: "10px" }}
      onClick={() => tryActivation(connector)}
      variant="contained"
    >
      {name}
    </Button>
  );
}
