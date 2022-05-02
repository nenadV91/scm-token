import React, { ReactNode } from "react";
import Navbar from "components/Navbar";
import useEagerConnect from "hooks/useEagerConnect";
import { styled } from "@mui/system";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

export default function Layout({ children }: { children: ReactNode }) {
  const eagerConnect = useEagerConnect();

  return (
    <Wrapper>
      <Navbar triedToEagerConnect={eagerConnect} />
      {children}
    </Wrapper>
  );
}
