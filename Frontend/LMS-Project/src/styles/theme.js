// import { createTheme } from "@mui/material/styles";

// export const getDesignTokens = (mode) => ({
//   palette: {
//     mode,
//     ...(mode === "light"
//       ? {
//           primary: { main: "#1976d2" },
//           secondary: { main: "#dc004e" },
//           background: { default: "#f5f5f5", paper: "#fff" },
//         }
//       : {
//           primary: { main: "#90caf9" },
//           secondary: { main: "#f48fb1" },
//           background: { default: "#121212", paper: "#1e1e1e" },
//         }),
//   },
//   typography: {
//     fontFamily: "Roboto, Arial, sans-serif",
//   },
// });

// // هذا هو المطلوب تصديره
// export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));


import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          primary: {
            light: "#64B5F6",
            main: "#2196F3",
            dark: "#1976D2",
            contrastText: "#FFFFFF",
          },
          secondary: {
            light: "#81C784",
            main: "#4CAF50",
            dark: "#388E3C",
            contrastText: "#FFFFFF",
          },
          error: {
            light: "#EF5350",
            main: "#F44336",
            dark: "#C62828",
            contrastText: "#FFFFFF",
          },
          warning: {
            light: "#FF9800",
            main: "#FF9800",
            dark: "#F57C00",
            contrastText: "#FFFFFF",
          },
          info: {
            light: "#29B6F6",
            main: "#0288D1",
            dark: "#0277BD",
            contrastText: "#FFFFFF",
          },
          success: {
            light: "#66BB6A",
            main: "#4CAF50",
            dark: "#388E3C",
            contrastText: "#FFFFFF",
          },
          background: {
            default: "#FAFAFA",
            paper: "#FFFFFF",
          },
          text: {
            primary: "#212121",
            secondary: "#757575",
          },
          grey: {
            50: "#FAFAFA",
            100: "#F5F5F5",
            200: "#EEEEEE",
            300: "#E0E0E0",
            400: "#BDBDBD",
            500: "#9E9E9E",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
          },
        }
      : {
          // Dark mode palette
          primary: {
            light: "#90caf9",
            main: "#64B5F6",
            dark: "#42A5F5",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
          secondary: {
            light: "#f48fb1",
            main: "#F06292",
            dark: "#EC407A",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
          error: {
            light: "#E57373",
            main: "#F44336",
            dark: "#D32F2F",
            contrastText: "#FFFFFF",
          },
          warning: {
            light: "#FFB74D",
            main: "#FF9800",
            dark: "#F57C00",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
          info: {
            light: "#4FC3F7",
            main: "#29B6F6",
            dark: "#0288D1",
            contrastText: "#FFFFFF",
          },
          success: {
            light: "#81C784",
            main: "#66BB6A",
            dark: "#388E3C",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#FFFFFF",
            secondary: "rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
          },
          grey: {
            50: "#212121",
            100: "#424242",
            200: "#616161",
            300: "#757575",
            400: "#9E9E9E",
            500: "#BDBDBD",
            600: "#E0E0E0",
            700: "#EEEEEE",
            800: "#F5F5F5",
            900: "#FAFAFA",
          },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: mode === "light" ? [
    "none",
    "0px 2px 8px rgba(33, 150, 243, 0.08)",
    "0px 4px 12px rgba(33, 150, 243, 0.12)",
    "0px 6px 16px rgba(33, 150, 243, 0.15)",
    "0px 8px 20px rgba(33, 150, 243, 0.18)",
    "0px 10px 24px rgba(33, 150, 243, 0.20)",
    "0px 12px 28px rgba(33, 150, 243, 0.22)",
    "0px 14px 32px rgba(33, 150, 243, 0.24)",
    "0px 16px 36px rgba(33, 150, 243, 0.26)",
    "0px 18px 40px rgba(33, 150, 243, 0.28)",
    "0px 20px 44px rgba(33, 150, 243, 0.30)",
    "0px 22px 48px rgba(33, 150, 243, 0.32)",
    "0px 24px 52px rgba(33, 150, 243, 0.34)",
    "0px 26px 56px rgba(33, 150, 243, 0.36)",
    "0px 28px 60px rgba(33, 150, 243, 0.38)",
    "0px 30px 64px rgba(33, 150, 243, 0.40)",
    "0px 32px 68px rgba(33, 150, 243, 0.42)",
    "0px 34px 72px rgba(33, 150, 243, 0.44)",
    "0px 36px 76px rgba(33, 150, 243, 0.46)",
    "0px 38px 80px rgba(33, 150, 243, 0.48)",
    "0px 40px 84px rgba(33, 150, 243, 0.50)",
    "0px 42px 88px rgba(33, 150, 243, 0.52)",
    "0px 44px 92px rgba(33, 150, 243, 0.54)",
    "0px 46px 96px rgba(33, 150, 243, 0.56)",
    "0px 48px 100px rgba(33, 150, 243, 0.58)",
  ] : Array(25).fill("none"),
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "5px 10px",
          fontSize: "0.95rem",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: mode === "light" 
              ? "0px 4px 12px rgba(33, 150, 243, 0.25)" 
              : "0px 4px 12px rgba(0, 0, 0, 0.25)",
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          background: mode === "light" 
            ? "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)" 
            : "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
          "&:hover": {
            background: mode === "light" 
              ? "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)" 
              : "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === "light" 
            ? "0px 4px 20px rgba(33, 150, 243, 0.08)" 
            : "0px 4px 20px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: mode === "light" 
              ? "0px 8px 30px rgba(33, 150, 243, 0.15)" 
              : "0px 8px 30px rgba(0, 0, 0, 0.3)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease-in-out",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === "light" 
            ? "rgba(255, 255, 255, 0.95)" 
            : "rgba(30, 30, 30, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: mode === "light" 
            ? "1px solid rgba(33, 150, 243, 0.1)" 
            : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: mode === "light" 
            ? "0px 2px 20px rgba(33, 150, 243, 0.08)" 
            : "0px 2px 20px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));