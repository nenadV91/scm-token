import { useCallback, useState } from "react";
import { styled } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

interface CardRowProps {
  readonly border: string;
}

const AccountRow = styled("div")<CardRowProps>`
  display: flex;
  justify-content: space-between;
  border-radius: 14px;
  padding: 1rem;
  align-items: center;

  border: ${({ border, theme }) =>
    border ? `1px dotted ${theme.palette.grey[400]}` : ""};
`;

const AccountText = styled(Typography)`
  display: flex;
  flex-direction: column;

  > strong {
    font-size: 12px;
  }
`;

const CardRow = styled("div")`
  padding: 0.2rem 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  > strong {
    margin-left: 10px;
  }
`;

const CardValue = styled("strong")`
  margin-left: 10px;
`;

const CardButton = styled(Button)`
  margin-left: auto;
`;

const Line = styled("div")`
  width: 100%;
  border-bottom: ${({ theme }) => `1px dotted ${theme.palette.grey[400]}`};
`;

const InvestBox = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const InvestField = styled(TextField)`
  flex: 1;
`;

const InvestRow = styled(CardRow)`
  display: flex;
  flex-direction: column;

  > p {
    max-width: 350px;
    text-align: center;
  }
`;

const Connected = () => {
  const { account, connector } = useWeb3React();

  const [wethDisbled, setWethDisabled] = useState(false);
  const [claimDisabled, setClaimDisabled] = useState(false);

  const [investAmount, setInvestAmount] = useState(0);
  const [investError, setInvestError] = useState<null | string>(null);
  const [investDisabled, setInvestDisabled] = useState(false);

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

  const handleInputChange = useCallback((event) => {
    setInvestAmount(event.target.value);
    setInvestError(null);
  }, []);

  const handleInvest = useCallback(
    (event) => {
      event.preventDefault();

      if (!investAmount || investAmount <= 0) {
        setInvestError("Insufficient amount");
        return;
      }

      setInvestDisabled(true);

      icoContract
        ?.invest(investAmount)
        .catch(({ error }) => {
          if (error.code === -32603) {
            setInvestError("Insufficient WETH allowance");
          }
        })
        .finally(() => {
          setInvestDisabled(false);
        });
    },
    [icoContract, investAmount]
  );

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

      <InvestRow>
        <Typography variant="body1">
          Invest certain amount of WETH and receive x10 times of that in SCM
          token.
        </Typography>

        <InvestBox onSubmit={handleClaim} component="form">
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
