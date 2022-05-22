import { useCallback, useMemo, useState } from "react";
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
import useTokenAllowance from "hooks/useTokenAllowance";
import { parseEther, formatEther } from "@ethersproject/units";
import useClaimableAmount from "state/ico/hooks/useClaimableAmount";
import useIcoContract from "state/ico/hooks/useIcoContract";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { WETH } from "constants/tokens";
import { MaxUint256 } from "@ethersproject/constants";
import { ICO_COTRACT_ADDRESS } from "constants/tokens";
import useRemaining from "state/ico/hooks/useRemaining";

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
  const { account, connector, chainId } = useWeb3React();

  // Disabled
  const [wethDisbled, setWethDisabled] = useState(false);
  const [claimDisabled, setClaimDisabled] = useState(false);
  const [approveDisabled, setApproveDisabled] = useState(false);

  // Investing
  const [investAmount, setInvestAmount] = useState();
  const [investError, setInvestError] = useState<null | string>(null);
  const [investDisabled, setInvestDisabled] = useState(false);

  // Contracts
  const wethContract = useWethContract();
  const scmContract = useScmContract();
  const icoContract = useIcoContract();
  const claimableAmount = useClaimableAmount();

  // Remaining
  const remaining = useRemaining();
  const remainingParsed = useMemo(() => {
    if (!remaining) {
      return "";
    }

    return formatEther(remaining?.toString()).toString();
  }, [remaining]);
  const isInvestmentOpen = remaining?.gt(0);

  // Weth
  const weth = chainId ? WETH[chainId] : undefined;
  const currentAllowance = useTokenAllowance(
    weth,
    account || "",
    icoContract?.address
  );

  const parsedInvestAmount = useMemo(() => {
    if (!investAmount || isNaN(parseFloat(investAmount))) {
      return "";
    }

    return parseEther(investAmount).toString();
  }, [investAmount]);

  const isWethApproved = useMemo(() => {
    return !currentAllowance?.lessThan(parsedInvestAmount);
  }, [currentAllowance, parsedInvestAmount]);

  const hasClaim = !claimableAmount?.equalTo(0);

  const { balance: wethBalance } = useTokenBalance(wethContract as Contract);
  const { balance: scmBalance } = useTokenBalance(scmContract as Contract);

  const handleApproveWeth = useCallback(() => {
    const icoAddress = chainId ? ICO_COTRACT_ADDRESS[chainId] : undefined;

    if (!account || !icoAddress) {
      return;
    }

    setApproveDisabled(true);

    wethContract?.approve(icoAddress, MaxUint256).finally(() => {
      setApproveDisabled(false);
    });
  }, [account, chainId, wethContract]);

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

      if (!parsedInvestAmount) {
        setInvestError("Insufficient amount");
        return;
      }

      if (wethBalance?.lessThan(parsedInvestAmount)) {
        setInvestError("Not enough WETH balance");
        return;
      }

      icoContract
        ?.invest(parsedInvestAmount)
        .catch(({ error }) => {
          if (error.code === -32603) {
            setInvestError("Insufficient WETH allowance");
          }
        })
        .finally(() => {
          setInvestDisabled(false);
          setInvestAmount(undefined);
        });
    },
    [icoContract, parsedInvestAmount, wethBalance]
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

      {isInvestmentOpen ? (
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

            {isWethApproved ? (
              <CardButton
                disabled={investDisabled}
                onClick={handleInvest}
                variant="outlined"
              >
                Invest WETH
              </CardButton>
            ) : (
              <CardButton
                disabled={approveDisabled}
                onClick={handleApproveWeth}
                variant="outlined"
              >
                Approve WETH
              </CardButton>
            )}
          </InvestBox>
          <FormHelperText error>{investError}</FormHelperText>
        </InvestRow>
      ) : (
        <Typography textAlign={"center"} variant="body1">
          Investment phase is over. <br /> You can claim available SCM tokens
          below.
        </Typography>
      )}

      <Line style={{ marginTop: 25 }} />

      {remaining ? (
        isInvestmentOpen ? (
          <>
            <CardRow>
              <Typography variant="caption">Current WETH balance: </Typography>
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
              <Typography variant="caption">
                Remaining ICO investments:{" "}
              </Typography>
              <Typography variant="body1">
                <CardValue>{remainingParsed} WETH</CardValue>
              </Typography>
            </CardRow>
          </>
        ) : (
          <>
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
          </>
        )
      ) : null}
    </StyledCard>
  );
};

export default Connected;
