import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface CardRowProps {
  readonly border: string;
}

export const AccountRow = styled("div")<CardRowProps>`
  display: flex;
  justify-content: space-between;
  border-radius: 14px;
  padding: 1rem;
  align-items: center;

  border: ${({ border, theme }) =>
    border ? `1px dotted ${theme.palette.grey[400]}` : ""};
`;

export const AccountText = styled(Typography)`
  display: flex;
  flex-direction: column;

  > strong {
    font-size: 12px;
  }
`;

export const CardRow = styled("div")`
  padding: 0.2rem 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  > strong {
    margin-left: 10px;
  }
`;

export const CardValue = styled("strong")`
  margin-left: 10px;
`;

export const CardButton = styled(Button)`
  margin-left: auto;
`;

export const Line = styled("div")`
  width: 100%;
  border-bottom: ${({ theme }) => `1px dotted ${theme.palette.grey[400]}`};
`;

export const InvestBox = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

export const InvestField = styled(TextField)`
  flex: 1;
`;

export const InvestRow = styled(CardRow)`
  display: flex;
  flex-direction: column;

  > p {
    max-width: 350px;
    text-align: center;
  }
`;
