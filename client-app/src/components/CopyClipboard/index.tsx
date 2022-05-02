import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/system";

const StyledChip = styled(Chip)`
  min-width: 150px;
`;

type CopyProps = {
  value: string;
  originalText: string;
  copyText: string;
};

export default function CopyClipboard({
  value,
  originalText,
  copyText,
}: CopyProps) {
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  useEffect(() => {
    if (copyStatus) {
      setTimeout(() => setCopyStatus(false), 2000);
    }
  }, [copyStatus]);

  const handleChipClick = () => {
    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setCopyStatus(true);
    });
  };

  return (
    <StyledChip
      variant="outlined"
      onClick={handleChipClick}
      label={copyStatus ? copyText : originalText}
    />
  );
}
