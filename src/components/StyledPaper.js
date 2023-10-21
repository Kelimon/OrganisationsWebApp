// StyledComponents.js
import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 15,
  backgroundColor: "#333",
  maxHeight: 500,
  height: 550,
  overflow: "auto",
}));

export { StyledPaper };
