// StyledComponents.js
import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(7),
  borderRadius: 51,
  backgroundColor: "white",
  maxHeight: 500,
  height: 550,
  overflow: "auto",
  boxShadow: theme.shadows[20], // Example shadow depth
}));

export { StyledPaper };
