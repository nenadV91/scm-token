import { useWeb3React } from "@web3-react/core";
import { useEffect, useState, useCallback } from "react";
import { WETH } from "constants/tokens";
import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { useBlockNumber } from "state/app/hooks";
import { Contract } from "@ethersproject/contracts";

export default function useWethBalance(contract: Contract | null) {
  const [balance, setBalance] = useState<CurrencyAmount<Token> | undefined>();

  const { account, chainId } = useWeb3React();

  const blockNumber = useBlockNumber();

  const weth = chainId ? WETH[chainId] : undefined;

  const fetchWethBalance = useCallback(async () => {
    if (!account || !contract || !weth) {
      return null;
    }

    try {
      const balance = await contract?.balanceOf(account);
      const parsed = CurrencyAmount.fromRawAmount(weth, balance.toString());
      setBalance(parsed);
    } catch (err) {
      console.log("Error fetching WETH");
    }
  }, [account, weth, contract]);

  useEffect(() => {
    fetchWethBalance();
  }, [fetchWethBalance, blockNumber]);

  return { balance };
}
