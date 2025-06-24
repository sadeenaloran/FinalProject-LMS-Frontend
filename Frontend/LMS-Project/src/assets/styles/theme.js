import { createTheme } from "@mui/material/styles";
// const generateShadows = (light = true) => {
//   const baseColor = light ? "rgba(26, 140, 240, 0." : "rgba(0, 0, 0, 0.";
//   const shadows = ["none"];
//   for (let i = 1; i <= 24; i++) {
//     const opacity = (0.04 + i * 0.02).toFixed(2).slice(2); // 0.06 → 0.52
//     shadows.push(`0px ${i * 2}px ${i * 2 + 2}px ${baseColor}${opacity})`);
//   }
//   return shadows;
// };
// shadows: mode === "light" ? generateShadows(true) : generateShadows(false),

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          primary: {
            light: "#4DABF5",
            main: "#1A8CF0",
            dark: "#1565C0",
            contrastText: "#FFFFFF",
          },
          secondary: {
            light: "#FFB74D",
            main: "#FF9800",
            dark: "#F57C00",
            contrastText: "#FFFFFF",
          },
          error: {
            light: "#FF6B6B",
            main: "#F44336",
            dark: "#D32F2F",
            contrastText: "#FFFFFF",
          },
          warning: {
            light: "#FFD166",
            main: "#FFB74D",
            dark: "#FFA000",
            contrastText: "#212121",
          },
          info: {
            light: "#64B5F6",
            main: "#2196F3",
            dark: "#1976D2",
            contrastText: "#FFFFFF",
          },
          success: {
            light: "#81C784",
            main: "#4CAF50",
            dark: "#388E3C",
            contrastText: "#FFFFFF",
          },
          background: {
            default: "#F8FAFC",
            paper: "#FFFFFF",
          },
          text: {
            primary: "#2D3748",
            secondary: "#718096",
            disabled: "#A0AEC0",
          },
          grey: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E0",
            400: "#94A3B8",
            500: "#64748B",
            600: "#475569",
            700: "#334155",
            800: "#1E293B",
            900: "#0F172A",
          },
        }
      : {
          // Dark mode palette
          primary: {
            light: "#4DABF5",
            main: "#1A8CF0",
            dark: "#1565C0",
            contrastText: "#FFFFFF",
          },
          secondary: {
            light: "#FFB74D",
            main: "#FF9800",
            dark: "#F57C00",
            contrastText: "#212121",
          },
          error: {
            light: "#FF6B6B",
            main: "#F44336",
            dark: "#D32F2F",
            contrastText: "#FFFFFF",
          },
          warning: {
            light: "#FFD166",
            main: "#FFB74D",
            dark: "#FFA000",
            contrastText: "#212121",
          },
          info: {
            light: "#64B5F6",
            main: "#2196F3",
            dark: "#1976D2",
            contrastText: "#FFFFFF",
          },
          success: {
            light: "#81C784",
            main: "#4CAF50",
            dark: "#388E3C",
            contrastText: "#FFFFFF",
          },
          background: {
            default: "#121826",
            paper: "#1E293B",
          },
          text: {
            primary: "#E2E8F0",
            secondary: "#94A3B8",
            disabled: "#64748B",
          },
          grey: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E0",
            400: "#94A3B8",
            500: "#64748B",
            600: "#475569",
            700: "#334155",
            800: "#1E293B",
            900: "#0F172A",
          },
        }),
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.25px",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.6,
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
      letterSpacing: "0.25px",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.6,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      lineHeight: 1.6,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: mode === "light" ? [
    "none",
    "0px 1px 2px rgba(26, 140, 240, 0.05)",
    "0px 2px 4px rgba(26, 140, 240, 0.08)",
    "0px 4px 6px rgba(26, 140, 240, 0.10)",
    "0px 6px 8px rgba(26, 140, 240, 0.12)",
    "0px 8px 10px rgba(26, 140, 240, 0.14)",
    "0px 10px 12px rgba(26, 140, 240, 0.16)",
    "0px 12px 14px rgba(26, 140, 240, 0.18)",
    "0px 14px 16px rgba(26, 140, 240, 0.20)",
    "0px 16px 18px rgba(26, 140, 240, 0.22)",
    "0px 18px 20px rgba(26, 140, 240, 0.24)",
    "0px 20px 22px rgba(26, 140, 240, 0.26)",
    "0px 22px 24px rgba(26, 140, 240, 0.28)",
    "0px 24px 26px rgba(26, 140, 240, 0.30)",
    "0px 26px 28px rgba(26, 140, 240, 0.32)",
    "0px 28px 30px rgba(26, 140, 240, 0.34)",
    "0px 30px 32px rgba(26, 140, 240, 0.36)",
    "0px 32px 34px rgba(26, 140, 240, 0.38)",
    "0px 34px 36px rgba(26, 140, 240, 0.40)",
    "0px 36px 38px rgba(26, 140, 240, 0.42)",
    "0px 38px 40px rgba(26, 140, 240, 0.44)",
    "0px 40px 42px rgba(26, 140, 240, 0.46)",
    "0px 42px 44px rgba(26, 140, 240, 0.48)",
    "0px 44px 46px rgba(26, 140, 240, 0.50)",
     "0px 46px 48px rgba(26, 140, 240, 0.52)",
  ] : [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.3)",
    "0px 2px 4px rgba(0, 0, 0, 0.3)",
    "0px 4px 6px rgba(0, 0, 0, 0.3)",
    "0px 6px 8px rgba(0, 0, 0, 0.3)",
    "0px 8px 10px rgba(0, 0, 0, 0.3)",
    "0px 10px 12px rgba(0, 0, 0, 0.3)",
    "0px 12px 14px rgba(0, 0, 0, 0.3)",
    "0px 14px 16px rgba(0, 0, 0, 0.3)",
    "0px 16px 18px rgba(0, 0, 0, 0.3)",
    "0px 18px 20px rgba(0, 0, 0, 0.3)",
    "0px 20px 22px rgba(0, 0, 0, 0.3)",
    "0px 22px 24px rgba(0, 0, 0, 0.3)",
    "0px 24px 26px rgba(0, 0, 0, 0.3)",
    "0px 26px 28px rgba(0, 0, 0, 0.3)",
    "0px 28px 30px rgba(0, 0, 0, 0.3)",
    "0px 30px 32px rgba(0, 0, 0, 0.3)",
    "0px 32px 34px rgba(0, 0, 0, 0.3)",
    "0px 34px 36px rgba(0, 0, 0, 0.3)",
    "0px 36px 38px rgba(0, 0, 0, 0.3)",
    "0px 38px 40px rgba(0, 0, 0, 0.3)",
    "0px 40px 42px rgba(0, 0, 0, 0.3)",
    "0px 42px 44px rgba(0, 0, 0, 0.3)",
    "0px 44px 46px rgba(0, 0, 0, 0.3)",
     "0px 46px 48px rgba(0, 0, 0, 0.32)", 
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: mode === "light" 
              ? "0px 4px 8px rgba(26, 140, 240, 0.2)" 
              : "0px 4px 8px rgba(0, 0, 0, 0.4)",
            transform: "translateY(-1px)",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: mode === "light" 
              ? "0px 4px 8px rgba(26, 140, 240, 0.2)" 
              : "0px 4px 8px rgba(0, 0, 0, 0.4)",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
          },
        },
      },
      variants: [
        {
          props: { variant: "gradient" },
          style: {
            background: mode === "light" 
              ? "linear-gradient(135deg, #1A8CF0 0%, #4DABF5 100%)" 
              : "linear-gradient(135deg, #1A8CF0 0%, #1565C0 100%)",
            color: "#FFFFFF",
            "&:hover": {
              background: mode === "light" 
                ? "linear-gradient(135deg, #1565C0 0%, #1A8CF0 100%)" 
                : "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === "light" 
            ? "0px 4px 12px rgba(26, 140, 240, 0.08)" 
            : "0px 4px 12px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: mode === "light" 
              ? "0px 8px 24px rgba(26, 140, 240, 0.12)" 
              : "0px 8px 24px rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === "light" 
            ? "rgba(255, 255, 255, 0.9)" 
            : "rgba(30, 41, 59, 0.9)",
          backdropFilter: "blur(8px)",
          boxShadow: mode === "light" 
            ? "0px 2px 4px rgba(26, 140, 240, 0.05)" 
            : "0px 2px 4px rgba(0, 0, 0, 0.2)",
          borderBottom: mode === "light" 
            ? "1px solid rgba(26, 140, 240, 0.1)" 
            : "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === "light" ? "rgba(26, 140, 240, 0.1)" : "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));