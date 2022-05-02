import { Web3Provider } from "@ethersproject/providers";

export default function getLibrary(provider: any): Web3Provider {
  let chainId = null;

  if (typeof provider.chainId === "number") {
    chainId = provider.chainId;
  } else if (typeof provider.chainId === "string") {
    chainId = parseInt(provider.chainId);
  }

  const library = new Web3Provider(provider, chainId);

  library.detectNetwork();

  return library;
}
