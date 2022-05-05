import { useWeb3React } from "@web3-react/core";
import { Scm } from "abis/types";
import { SCM } from "constants/tokens";
import SCM_ABI from "abis/Scm.json";
import useContract from "hooks/useContract";

export default function useScmContract(withSignerIfPossible?: boolean) {
  const { chainId } = useWeb3React();

  return useContract<Scm>(
    chainId ? SCM[chainId]?.address : undefined,
    SCM_ABI,
    withSignerIfPossible
  );
}
