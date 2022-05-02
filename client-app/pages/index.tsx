import type { NextPage } from "next";
import { useMemo } from "react";
import { styled } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSetModalOpen } from "state/app/hooks";
import { ApplicationModal } from "state/app/types";

const Wrapper = styled("div")`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledCard = styled(Card)<{
  textAlign?: string;
  centerContent?: boolean;
}>`
  width: 100%;
  max-width: 480px;
  min-height: 300px;
  padding: 1rem;
  text-align: ${({ textAlign }) => textAlign || "left"};

  > * {
    margin-bottom: 20px;
  }

  ${({ centerContent }) =>
    centerContent &&
    `
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    `}
`;

const NotConnected = () => {
  const openModal = useSetModalOpen(ApplicationModal.WALLET);

  return (
    <StyledCard centerContent textAlign="center">
      <Typography gutterBottom={true} variant="h5">
        Welcome to scm ico
      </Typography>

      <Typography gutterBottom={true} variant="body1">
        Please connect your wallet account to be able to invest in our awesome
        ICO that is going to 🚀
      </Typography>

      <Button variant="contained" onClick={openModal}>
        Connect Wallet
      </Button>
    </StyledCard>
  );
};

type ConnectedProps = {
  account: string;
};

const Connected = ({ account }: ConnectedProps) => {
  return (
    <StyledCard centerContent textAlign="center">
      <Typography gutterBottom={true} variant="h6">
        Welcome to scm ico
      </Typography>
    </StyledCard>
  );
};

const Home: NextPage = () => {
  const { account } = useWeb3React();

  const content = useMemo(() => {
    if (!account) return <NotConnected />;
    else return <Connected account={account} />;
  }, [account]);

  return <Wrapper>{content}</Wrapper>;
};

export default Home;
