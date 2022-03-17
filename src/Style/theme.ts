import { createTheme } from "@mui/material";

export const FASTDEV_COLOR_MAIN = "#16eab7";
export const BACKGROUND_COLOR_GRAY = "#343434";
export const FASTDEV_FONT_FAMILY = {
  color: FASTDEV_COLOR_MAIN,
  fontWeight: 700,
  lineHeight: 1.2,
  fontSize: "1.25rem",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#51bca1",
    },
  },
  typography: {
    h4: {
      ...FASTDEV_FONT_FAMILY,
      fontSize: "1.5rem",
    },
    body1: {
      ...FASTDEV_FONT_FAMILY,
      fontSize: "1.25rem",
    },
    caption: {
      ...FASTDEV_FONT_FAMILY,
      fontSize: "0.75rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ...FASTDEV_FONT_FAMILY,
          backgroundColor: BACKGROUND_COLOR_GRAY,
          height: 40,
          fontSize: "1rem",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: BACKGROUND_COLOR_GRAY,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: BACKGROUND_COLOR_GRAY,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: BACKGROUND_COLOR_GRAY,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: FASTDEV_FONT_FAMILY.color,
        },
      },
    },
  },
});
