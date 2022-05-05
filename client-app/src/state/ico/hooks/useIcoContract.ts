import { useWeb3React } from "@web3-react/core";
import { Ico } from "abis/types";
import { ICO_COTRACT_ADDRESS } from "constants/tokens";
import ICO_ABI from "abis/Ico.json";
import useContract from "hooks/useContract";

export default function useIcoContract(withSignerIfPossible = true) {
  const { chainId } = useWeb3React();

  return useContract<Ico>(
    chainId ? ICO_COTRACT_ADDRESS[chainId] : undefined,
    ICO_ABI,
    withSignerIfPossible
  );
}
