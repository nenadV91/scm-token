import type { NextPage } from "next";
import { styled } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import Connected from "./Connected";
import NotConnected from "./NotConnected";

const Wrapper = styled("div")`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Home: NextPage = () => {
  const { account } = useWeb3React();

  return <Wrapper>{account ? <Connected /> : <NotConnected />}</Wrapper>;
};

export default Home;
