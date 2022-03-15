import { Box, CircularProgress, Typography } from "@mui/material";
import { ISession } from "../../Api/Session/interfaces";

interface ISessionHeaderProps {
  session?: ISession;
}

export const SessionHeader = ({ session }: ISessionHeaderProps) =>
  session ? (
    <>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        component="div"
        marginTop={1.5}
      >
        {session?.name ?? ""}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        component="div"
        color="secondary"
      >
        {session?.date ? new Date(session.date).toLocaleDateString() : <></>}
      </Typography>
    </>
  ) : (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
      <CircularProgress />
    </Box>
  );
