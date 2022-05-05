import { Typography } from "@mui/material";
import React from "react";
import { CardButton, CardRow, CardValue } from "../styled";

export default function WethBalance() {
  return (
    <CardRow>
      <Typography variant="caption">WETH balance: </Typography>
      <Typography variant="body1">
        <CardValue>{wethBalance?.toFixed(2)}</CardValue>
      </Typography>

      <CardButton
        disabled={wethDisbled}
        onClick={handleAddWeth}
        variant="outlined"
      >
        Get 5 custom WETH
      </CardButton>
    </CardRow>
  );
}
