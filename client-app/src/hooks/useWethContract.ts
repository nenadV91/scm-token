import { useWeb3React } from "@web3-react/core";
import { Weth } from "abis/types";
import { WETH } from "constants/tokens";
import WETH_ABI from "abis/Weth.json";
import useContract from "hooks/useContract";

export default function useWethContract(withSignerIfPossible?: boolean) {
  const { chainId } = useWeb3React();

  return useContract<Weth>(
    chainId ? WETH[chainId]?.address : undefined,
    WETH_ABI,
    withSignerIfPossible
  );
}
