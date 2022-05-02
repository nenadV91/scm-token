import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    text: {
      secondary: "#c3c5cb",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
