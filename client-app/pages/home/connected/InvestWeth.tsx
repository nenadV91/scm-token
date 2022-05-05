import { useCallback, useState } from "react";
import { InvestRow, InvestBox, InvestField, CardButton } from "../styled";
import { Typography, FormHelperText } from "@mui/material";
import useIcoContract from "state/ico/hooks/useIcoContract";

export default function InvestWeth() {
  const [investAmount, setInvestAmount] = useState(0);
  const [investError, setInvestError] = useState<null | string>(null);
  const [investDisabled, setInvestDisabled] = useState(false);

  const icoContract = useIcoContract();

  const handleInputChange = useCallback((event) => {
    setInvestAmount(event.target.value);
    setInvestError(null);
  }, []);

  const handleInvest = useCallback(
    (event) => {
      event.preventDefault();

      if (!investAmount || investAmount >= 0) {
        setInvestError("Insufficient invested amount");
        return;
      }

      setInvestDisabled(true);

      icoContract?.invest(investAmount).finally(() => {
        setInvestDisabled(false);
      });
    },
    [icoContract, investAmount]
  );

  return (
    <InvestRow>
      <Typography variant="body1">
        Invest certain amount of WETH and receive x10 times of that in SCM
        token.
      </Typography>

      <InvestBox onSubmit={handleInvest} component="form">
        <InvestField
          onChange={handleInputChange}
          label="WETH amount"
          variant="outlined"
          size="small"
        />

        <CardButton
          disabled={investDisabled}
          onClick={handleInvest}
          variant="outlined"
        >
          Invest WETH
        </CardButton>
      </InvestBox>
      <FormHelperText error>{investError}</FormHelperText>
    </InvestRow>
  );
}
