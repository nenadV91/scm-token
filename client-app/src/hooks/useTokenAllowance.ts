import { useMemo, useEffect, useState } from "react";
import { Token, CurrencyAmount, Currency } from "@uniswap/sdk-core";
import useTokenContract from "./useTokenContract";
import { useBlockNumber } from "state/app/hooks";

export default function useTokenAllowance(
  token?: Token,
  owner?: string,
  spender?: string
): CurrencyAmount<Token> | undefined {
  const contract = useTokenContract(token?.address, false);
  const blockNumber = useBlockNumber();

  const [allowance, setAllowance] = useState<CurrencyAmount<Token> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!owner || !spender) {
      return;
    }

    contract?.allowance(owner, spender).then((amount) => {
      if (!token) {
        return;
      }

      setAllowance(CurrencyAmount.fromRawAmount(token, amount.toString()));
    });
  }, [contract, owner, spender, token, blockNumber]);

  return allowance;
}
