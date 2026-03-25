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
            default: "#05070d",
            paper: "#0f1420",
        },
        text: {
            primary: "#eef2ff",
            secondary: "#9aa4bf",
        },
        divider: alpha("#ffffff", 0.08),
    },

    shape: {
        borderRadius: 10,
    },

    typography: {
        fontFamily: "Roboto, system-ui, sans-serif",

        h1: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "3.35rem",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
        },
        h2: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "2.8rem",
            lineHeight: 1.04,
            letterSpacing: "-0.022em",
        },
        h3: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "2.24rem",
            lineHeight: 1.06,
            letterSpacing: "-0.018em",
        },
        h4: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1.82rem",
            lineHeight: 1.08,
            letterSpacing: "-0.014em",
        },
        h5: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1.54rem",
            lineHeight: 1.1,
            letterSpacing: "-0.012em",
        },
        h6: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1.4rem",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
        },

        subtitle1: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1.34rem",
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
        },

        subtitle2: {
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1.18rem",
            lineHeight: 1.2,
            letterSpacing: "-0.008em",
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
                html: {
                    minHeight: "100%",
                    backgroundColor: "#05070d",
                },

                body: {
                    minHeight: "100%",
                    backgroundColor: "#05070d",
                    backgroundImage: `
                        radial-gradient(circle at 12% 14%, rgba(139,92,246,0.18), transparent 20%),
                        radial-gradient(circle at 84% 12%, rgba(34,211,238,0.14), transparent 18%),
                        radial-gradient(circle at 68% 32%, rgba(124,58,237,0.10), transparent 24%),
                        radial-gradient(circle at 30% 72%, rgba(34,211,238,0.08), transparent 22%),
                        radial-gradient(circle at 80% 82%, rgba(139,92,246,0.08), transparent 18%),
                        linear-gradient(180deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0) 24%),
                        linear-gradient(135deg, #060812 0%, #090d18 28%, #070a12 58%, #05070d 100%)
                    `,
                    backgroundAttachment: "fixed",
                    backgroundRepeat: "no-repeat",
                    color: "#eef2ff",
                    position: "relative",
                },

                "#root": {
                    minHeight: "100vh",
                    position: "relative",
                    isolation: "isolate",
                },

                "#root::before": {
                    content: '""',
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    background: `
                        radial-gradient(circle at 50% 0%, rgba(255,255,255,0.035), transparent 28%),
                        linear-gradient(180deg, rgba(255,255,255,0.012), rgba(255,255,255,0))
                    `,
                    zIndex: -2,
                },

                "#root::after": {
                    content: '""',
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
                    `,
                    backgroundSize: "72px 72px",
                    maskImage: "radial-gradient(circle at center, black 38%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(circle at center, black 38%, transparent 100%)",
                    opacity: 0.12,
                    zIndex: -1,
                },

                code: {
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                },

                pre: {
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
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
                    fontSize: "1.22rem",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
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