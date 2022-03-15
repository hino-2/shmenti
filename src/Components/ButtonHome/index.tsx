import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ButtonHome = () => (
  <Link to="/">
    <Button variant="outlined">Go Home</Button>
  </Link>
);
