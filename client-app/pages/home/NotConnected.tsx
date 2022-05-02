import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSetModalOpen } from "state/app/hooks";
import { ApplicationModal } from "state/app/types";
import StyledCard from "components/Card";

const Wrapper = styled("div")`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NotConnected = () => {
  const openModal = useSetModalOpen(ApplicationModal.WALLET);

  return (
    <StyledCard view_center="true" text_align="center">
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

export default NotConnected;
