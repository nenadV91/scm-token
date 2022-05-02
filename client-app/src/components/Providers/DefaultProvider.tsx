import { createWeb3ReactRoot } from "@web3-react/core";
import { DefaultProviderName } from "constants/index";

const Web3ReactProviderDefault = createWeb3ReactRoot(DefaultProviderName);

const Web3ReactProviderDefaultSSR = ({ children, getLibrary }: any) => {
  return (
    <Web3ReactProviderDefault getLibrary={getLibrary}>
      {children}
    </Web3ReactProviderDefault>
  );
};

export default Web3ReactProviderDefaultSSR;
