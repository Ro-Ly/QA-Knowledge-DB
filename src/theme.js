import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#9B8CFF',
        },
        secondary: {
            main: '#35E0FF',
        },
        background: {
            default: '#02040D',
            paper: 'rgba(10, 14, 28, 0.88)',
        },
        text: {
            primary: '#F5F7FF',
            secondary: '#A8B3CF',
        },
        divider: 'rgba(255,255,255,0.08)',
    },
    shape: {
        borderRadius: 14,
    },
    typography: {
        fontFamily: '"Space Grotesk", "Inter", "Segoe UI", sans-serif',
        h3: {
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
        },
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.03em',
        },
        h5: {
            fontWeight: 600,
            letterSpacing: '-0.02em',
        },
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            fontWeight: 600,
        },
        body1: {
            lineHeight: 1.8,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@import': 'url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap")',
                html: {
                    scrollBehavior: 'smooth',
                },
                body: {
                    margin: 0,
                    minHeight: '100vh',
                    background: `
                        radial-gradient(circle at 10% 10%, rgba(120, 86, 255, 0.12), transparent 20%),
                        radial-gradient(circle at 90% 20%, rgba(0, 224, 255, 0.08), transparent 20%),
                        radial-gradient(circle at 50% 80%, rgba(255, 77, 166, 0.06), transparent 22%),
                        linear-gradient(180deg, #01030A 0%, #02040D 40%, #040813 100%)
                    `,
                    color: '#F5F7FF',
                },
                '#root': {
                    minHeight: '100vh',
                },
                '*': {
                    boxSizing: 'border-box',
                },
                '::selection': {
                    background: 'rgba(155,140,255,0.35)',
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(10, 14, 28, 0.82)',
                    backdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px !important',
                    overflow: 'hidden',
                    boxShadow: '0 14px 40px rgba(0, 0, 0, 0.32)',
                    '&:before': {
                        display: 'none',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    minHeight: 64,
                },
                content: {
                    margin: '14px 0',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))',
                    color: '#F5F7FF',
                    fontWeight: 500,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        backgroundColor: 'rgba(255,255,255,0.035)',
                        backdropFilter: 'blur(10px)',
                    },
                },
            },
        },
    },
});

export default theme;