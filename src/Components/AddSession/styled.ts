import { Box, Button, styled } from "@mui/material";
import { BACKGROUND_COLOR_GRAY } from "../../Style/theme";

export const AddSessionButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  margin: 8px;
`;

export const GrayBox = styled(Box)`
  background-color: ${BACKGROUND_COLOR_GRAY};
  min-width: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
