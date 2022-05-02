import type { NextPage } from "next";
import { styled } from "@mui/system";

const Wrapper = styled("div")`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Home: NextPage = () => {
  return <Wrapper>Homepage</Wrapper>;
};

export default Home;
