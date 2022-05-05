import { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Typography from "@mui/material/Typography";
import getConnectorType from "utils/getConnectorType";
import StyledCard from "components/Card";
import CopyClipboard from "components/CopyClipboard";
import { shortenAddress } from "utils";
import { Contract } from "@ethersproject/contracts";
import useTokenBalance from "hooks/useTokenBalance";
import useWethContract from "hooks/useWethContract";
import useScmContract from "hooks/useScmContract";
import { parseEther } from "@ethersproject/units";
import useClaimableAmount from "state/ico/hooks/useClaimableAmount";
import useIcoContract from "state/ico/hooks/useIcoContract";
import InvestWeth from "./InvestWeth";

const Connected = () => {
  const { account, connector } = useWeb3React();

  const [wethDisbled, setWethDisabled] = useState(false);
  const [claimDisabled, setClaimDisabled] = useState(false);

  const wethContract = useWethContract();
  const scmContract = useScmContract();
  const icoContract = useIcoContract();
  const claimableAmount = useClaimableAmount();

  const hasClaim = !claimableAmount?.equalTo(0);

  const { balance: wethBalance } = useTokenBalance(wethContract as Contract);
  const { balance: scmBalance } = useTokenBalance(scmContract as Contract);

  const handleAddWeth = useCallback(() => {
    if (!account) {
      return;
    }

    setWethDisabled(true);

    wethContract
      ?.magicallyCreate(account, parseEther("5").toString())
      .finally(() => {
        setWethDisabled(false);
      });
  }, [account, wethContract]);

  const handleClaim = useCallback(() => {
    setClaimDisabled(true);

    icoContract?.claim().finally(() => {
      setClaimDisabled(false);
    });
  }, [icoContract]);

  if (!account || !connector) return null;

  return (
    <StyledCard>
      <AccountRow border="true">
        <AccountText variant="body1">
          <span>Connected with</span>
          <strong>{getConnectorType(connector)}</strong>
        </AccountText>

        <CopyClipboard
          value={account}
          originalText={shortenAddress(account, 6)}
          copyText="Coppied!"
        />
      </AccountRow>

      <InvestWeth />

      <Line style={{ marginTop: 25 }} />

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

      <CardRow>
        <Typography variant="caption">SCM balance: </Typography>
        <Typography variant="body1">
          <CardValue>{scmBalance?.toFixed(2)}</CardValue>
        </Typography>
      </CardRow>
    </StyledCard>
  );
};

export default Connected;
