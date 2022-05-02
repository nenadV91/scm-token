import { styled } from "@mui/system";
import Card from "@mui/material/Card";

const StyledCard = styled(Card)<{
  text_align?: string;
  view_center?: string;
}>`
  width: 100%;
  max-width: 480px;
  min-height: 300px;
  padding: 1rem;
  text-align: ${({ text_align }) => text_align || "left"};

  > * {
    margin-bottom: 25px;
  }

  ${({ view_center }) =>
    view_center &&
    `
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    `}
`;

export default StyledCard;
