import { createTheme } from "@mui/material/styles";

export const createAppTheme = (mode = "light", direction = "ltr") => {
  return createTheme({
    direction,

    palette: {
      mode,

      primary: {
        main: "#1E3A8A",
      },

      secondary: {
        main: "#FBBF24",
      },

      background:
        mode === "light"
          ? {
              default: "#F7F9FC",
              paper: "#FFFFFF",
            }
          : {
              default: "#0B1220",
              paper: "#111A2B",
            },
    },

    typography: {
      fontFamily:
        direction === "rtl"
          ? '"IBM Plex Sans Arabic", "Inter", system-ui, sans-serif'
          : '"Inter", "Noto Sans Arabic", system-ui, sans-serif',

      h1: {
        fontWeight: 800,
        letterSpacing: direction === "rtl" ? "-0.02em" : "-0.04em",
      },

      h2: {
        fontWeight: 800,
        letterSpacing: direction === "rtl" ? "-0.015em" : "-0.03em",
      },

      h3: {
        fontWeight: 750,
      },
    },

    shape: {
      borderRadius: 18,
    },

    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            direction,
          },

          outlined: {
            color: mode === "light" ? "#1E3A8A" : "#FFFFFF",
            borderColor: mode === "light" ? "#1E3A8A" : "#FFFFFF",
          },
        },
      },

      MuiAvatar: {
        styleOverrides: {
          root: {
            color: "#FFFFFF",
            borderColor: mode === "light" ? "#1E3A8A" : "#FFFFFF",
          },
        },
      },

      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "#1E3A8A" : "#FBBF24",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
            fontWeight: 700,
          },

          outlined: {
            color: mode === "light" ? "#1E3A8A" : "#FFFFFF",
            borderColor: mode === "light" ? "#1E3A8A" : "#FFFFFF",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            border: "1px solid rgba(128,145,170,.18)",
            boxShadow: "0 12px 36px rgba(20,40,80,.08)",
          },
        },
      },

      MuiTypography: {
        styleOverrides: {
          h5: {
            color: mode === "light" ? "#1E3A8A" : "#FBBF24",
          },
        },
      },
    },
  });
};
