import { useEffect, useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { useBlockNumber } from "state/app/hooks";
import useIcoContract from "state/ico/hooks/useIcoContract";
import { SCM } from "constants/tokens";

const ZERO_AMOUNT = BigNumber.from(0);

export default function useClaimableAmount() {
  const [amount, setAmount] = useState<CurrencyAmount<Token> | undefined>();

  const { account, chainId } = useWeb3React();

  const icoContract = useIcoContract();
  const blockNumber = useBlockNumber();

  const scm = chainId ? SCM[chainId] : undefined;

  const fetchClaimableBalance = useCallback(async () => {
    if (!account || !icoContract || !scm) {
      return null;
    }

    try {
      const amount = await icoContract?.claimableAmount(account);
      const parsed = CurrencyAmount.fromRawAmount(scm, amount.toString());
      setAmount(parsed);
    } catch (err) {
      console.log("Error fetching claimable amount");
    }
  }, [account, scm, icoContract]);

  useEffect(() => {
    fetchClaimableBalance();
  }, [fetchClaimableBalance, blockNumber]);

  return amount;
}
