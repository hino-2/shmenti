import { Box, styled, Typography } from "@mui/material";

const FooterContainer = styled(Box)`
  position: fixed;
  bottom: 0%;
  right: 0%;
`;

export const Footer = () => (
  <FooterContainer>
    <Typography variant="caption">Igor Ushakov</Typography>
  </FooterContainer>
);
