import { Typography } from "@mui/material";
import React from "react";
import { CardButton, CardRow, CardValue } from "../styled";

export default function ClaimableScm() {
  return (
    <CardRow>
      <Typography variant="caption">Claimable SCM: </Typography>
      <Typography variant="body1">
        <CardValue>{claimableAmount?.toFixed(2)}</CardValue>
      </Typography>

      <CardButton
        disabled={!hasClaim || claimDisabled}
        onClick={handleClaim}
        variant="outlined"
      >
        Claim SCM
      </CardButton>
    </CardRow>
  );
}
