import { useEffect, useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { useBlockNumber } from "state/app/hooks";
import useIcoContract from "state/ico/hooks/useIcoContract";

export default function useClaimableAmount() {
  const [remaining, setRemaining] = useState<BigNumber | undefined>();

  const { account } = useWeb3React();

  const icoContract = useIcoContract();
  const blockNumber = useBlockNumber();

  const fetchRemaining = useCallback(async () => {
    if (!account || !icoContract) {
      return null;
    }

    try {
      const amount = await icoContract?.remaining();
      setRemaining(amount);
    } catch (err) {
      console.log("Error fetching remaining open investing amount");
    }
  }, [account, icoContract]);

  useEffect(() => {
    fetchRemaining();
  }, [fetchRemaining, blockNumber]);

  return remaining;
}
