import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    Stack,
    Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function detectCodeLanguage(category, code) {
    const c = (category || '').toLowerCase();
    const codeTrim = (code || '').trim();

    if (c.includes('sql')) return 'sql';
    if (c.includes('java')) return 'java';
    if (c.includes('git')) return 'bash';
    if (c.includes('http')) return 'http';
    if (codeTrim.startsWith('{') || codeTrim.startsWith('[')) return 'json';

    return '';
}

function normalizeAnswerToMarkdown(answer = '') {
    if (!answer) return '';

    const codeMarkerRegex = /\n?Код:\n([\s\S]*)$/i;
    const match = answer.match(codeMarkerRegex);

    if (match) {
        const textPart = answer.replace(codeMarkerRegex, '').trim();
        const codePart = match[1].trim();

        return `${textPart}\n\n\`\`\`\n${codePart}\n\`\`\``;
    }

    return answer;
}

const QuestionCard = ({ question }) => {
    const markdown = normalizeAnswerToMarkdown(question.answer);

    return (
        <Accordion
            sx={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: 'none',
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {question.title}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {!!question.tags?.length && (
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                        {question.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                )}

                <Box
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        '& p': { mb: 2, mt: 0 },
                        '& ul, & ol': { pl: 3, mb: 2 },
                        '& li': { mb: 0.5 },
                        '& code': {
                            fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
                        },
                        '& pre': {
                            m: 0,
                        },
                    }}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ inline, className, children, ...props }) {
                                const rawCode = String(children).replace(/\n$/, '');
                                const match = /language-(\w+)/.exec(className || '');
                                const detectedLanguage =
                                    match?.[1] || detectCodeLanguage(question.category, rawCode);

                                if (inline) {
                                    return (
                                        <Box
                                            component="code"
                                            sx={{
                                                px: 0.75,
                                                py: 0.25,
                                                borderRadius: 1,
                                                backgroundColor: 'rgba(255,255,255,0.08)',
                                                fontSize: '0.9em',
                                            }}
                                            {...props}
                                        >
                                            {children}
                                        </Box>
                                    );
                                }

                                return (
                                    <Box sx={{ mb: 2 }}>
                                        <SyntaxHighlighter
                                            language={detectedLanguage || 'text'}
                                            style={oneDark}
                                            PreTag="div"
                                            customStyle={{
                                                margin: 0,
                                                borderRadius: '12px',
                                                padding: '16px',
                                                background: '#0d1321',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                overflowX: 'auto',
                                            }}
                                            codeTagProps={{
                                                style: {
                                                    fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
                                                    fontSize: '0.95rem',
                                                },
                                            }}
                                            {...props}
                                        >
                                            {rawCode}
                                        </SyntaxHighlighter>
                                    </Box>
                                );
                            },
                            h1: ({ children }) => (
                                <Typography variant="h5" sx={{ mt: 2, mb: 1.5 }}>
                                    {children}
                                </Typography>
                            ),
                            h2: ({ children }) => (
                                <Typography variant="h6" sx={{ mt: 2, mb: 1.5 }}>
                                    {children}
                                </Typography>
                            ),
                            h3: ({ children }) => (
                                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                    {children}
                                </Typography>
                            ),
                            p: ({ children }) => (
                                <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                                    {children}
                                </Typography>
                            ),
                            li: ({ children }) => (
                                <li>
                                    <Typography variant="body1" component="span">
                                        {children}
                                    </Typography>
                                </li>
                            ),
                            blockquote: ({ children }) => (
                                <Box
                                    sx={{
                                        borderLeft: '4px solid',
                                        borderColor: 'primary.main',
                                        pl: 2,
                                        py: 0.5,
                                        my: 2,
                                        opacity: 0.9,
                                    }}
                                >
                                    {children}
                                </Box>
                            ),
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default QuestionCard;