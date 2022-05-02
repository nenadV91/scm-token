import { styled } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import Typography from "@mui/material/Typography";
import getConnectorType from "utils/getConnectorType";
import StyledCard from "components/Card";
import CopyClipboard from "components/CopyClipboard";
import { shortenAddress } from "utils";

const CardRow = styled("div")`
  display: flex;
  justify-content: space-between;
  border: 1px dotted ${({ theme }) => theme.palette.grey[400]};
  border-radius: 14px;
  padding: 1rem;
  align-items: center;
`;

const AccountText = styled(Typography)`
  display: flex;
  flex-direction: column;

  > strong {
    font-size: 12px;
  }
`;

const Connected = () => {
  const { account, connector } = useWeb3React();

  if (!account || !connector) return null;

  return (
    <StyledCard>
      <CardRow>
        <AccountText variant="body1">
          <span>Connected with</span>
          <strong>{getConnectorType(connector)}</strong>
        </AccountText>

        <CopyClipboard
          value={account}
          originalText={shortenAddress(account, 6)}
          copyText="Coppied!"
        />
      </CardRow>
    </StyledCard>
  );
};

export default Connected;
