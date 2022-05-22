import useContract from "./useContract";
import ERC20_ABI from "abis/ERC20.json";
import { ERC20 } from "abis/types";

export default function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
) {
  return useContract<ERC20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
