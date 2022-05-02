import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Web3Status from "components/Web3Status";

type NavbarProps = {
  triedToEagerConnect: boolean;
};

export default function Navbar({ triedToEagerConnect }: NavbarProps) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="body1" component="div">
          ICO app
        </Typography>
        {triedToEagerConnect && <Web3Status />}
      </Toolbar>
    </AppBar>
  );
}
