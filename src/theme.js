import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#8b5cf6",
        },
        secondary: {
            main: "#22d3ee",
        },
        background: {
            default: "#07090f",
            paper: "#0f1420",
        },
        text: {
            primary: "#eef2ff",
            secondary: "#9aa4bf",
        },
        divider: alpha("#ffffff", 0.08),
    },

    shape: {
        borderRadius: 10, // 👈 more subtle rounding
    },

    typography: {
        fontFamily: "Roboto, system-ui, sans-serif",

        h1: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "2.4rem",
            letterSpacing: "-0.02em",
        },
        h2: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "2rem",
            letterSpacing: "-0.02em",
        },
        h3: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1.6rem",
        },
        h4: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1.3rem",
        },
        h5: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1.1rem",
        },
        h6: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1rem",
        },

        body1: {
            fontSize: "0.95rem",
            lineHeight: 1.65,
        },

        body2: {
            fontSize: "0.85rem",
            lineHeight: 1.6,
        },

        button: {
            textTransform: "none",
            fontWeight: 500,
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background:
                        "radial-gradient(circle at top, rgba(139,92,246,0.10), transparent 25%), radial-gradient(circle at 85% 10%, rgba(34,211,238,0.08), transparent 20%), #07090f",
                },

                code: {
                    fontFamily:
                        '"JetBrains Mono", "Fira Code", monospace',
                },

                pre: {
                    fontFamily:
                        '"JetBrains Mono", "Fira Code", monospace',
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    background:
                        "linear-gradient(180deg, rgba(18,24,38,0.96) 0%, rgba(11,15,25,0.96) 100%)",
                },
            },
        },

        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderRadius: "12px !important",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
                    "&::before": {
                        display: "none",
                    },
                },
            },
        },

        MuiAccordionSummary: {
            styleOverrides: {
                content: {
                    fontFamily: '"Roboto Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: "1rem",
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontSize: "0.75rem",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

export default theme;