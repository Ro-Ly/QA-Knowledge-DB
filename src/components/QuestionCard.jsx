import React, { useState, useMemo, memo, Suspense } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    Stack,
    Box,
    CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// 🔥 Lazy load heavy stuff
const ReactMarkdown = React.lazy(() => import('react-markdown'));
const remarkGfm = React.lazy(() => import('remark-gfm'));
const SyntaxHighlighter = React.lazy(() =>
    import('react-syntax-highlighter').then((mod) => ({
        default: mod.Prism,
    }))
);
const oneDark = require('react-syntax-highlighter/dist/esm/styles/prism').oneDark;

function detectCodeLanguage(category, code) {
    const c = (category || '').toLowerCase();
    const codeTrim = (code || '').trim();

    if (c.includes('sql')) return 'sql';
    if (c.includes('java')) return 'java';
    if (c.includes('git')) return 'bash';
    if (c.includes('http')) return 'http';
    if (codeTrim.startsWith('{') || codeTrim.startsWith('[')) return 'json';

    if (codeTrim.includes('System.out.println') || codeTrim.includes('class ')) return 'java';

    if (
        codeTrim.includes('SELECT ') ||
        codeTrim.includes('INSERT ') ||
        codeTrim.includes('UPDATE ') ||
        codeTrim.includes('DELETE ') ||
        codeTrim.includes('CREATE VIEW')
    ) {
        return 'sql';
    }

    if (codeTrim.includes('curl ') || codeTrim.includes('HTTP/1.1')) return 'http';

    return '';
}

function looksLikeCodeLine(line = '') {
    const trimmed = line.trim();
    if (!trimmed) return false;

    return (
        trimmed.endsWith('{') ||
        trimmed === '}' ||
        trimmed === '};' ||
        trimmed.includes('();') ||
        trimmed.includes('System.out.') ||
        trimmed.includes('console.log') ||
        trimmed.includes('SELECT ') ||
        trimmed.includes('INSERT ') ||
        trimmed.includes('UPDATE ') ||
        trimmed.includes('DELETE ') ||
        trimmed.includes('CREATE ') ||
        trimmed.includes('FROM ') ||
        trimmed.includes('WHERE ') ||
        trimmed.includes('class ') ||
        trimmed.includes('public ') ||
        trimmed.includes('private ') ||
        trimmed.includes('protected ') ||
        trimmed.includes('void ') ||
        trimmed.includes('return ') ||
        trimmed.includes('extends ') ||
        trimmed.includes('implements ') ||
        trimmed.includes('super(') ||
        trimmed.includes('this.') ||
        /^<\/?[a-z][\s\S]*>/i.test(trimmed) ||
        /^[\w$]+\s*\(.*\)\s*\{?$/.test(trimmed)
    );
}

function normalizeAnswerToMarkdown(answer = '', category = '') {
    if (!answer) return '';

    if (answer.includes('```')) return answer;

    const markerMatch = answer.match(/([\s\S]*?)(\n(?:Код|Пример):\n)([\s\S]*)/i);

    if (markerMatch) {
        const textPart = markerMatch[1].trim();
        const marker = markerMatch[2].trim();
        const codePart = markerMatch[3].trim();
        const lang = detectCodeLanguage(category, codePart);

        return `${textPart}\n\n${marker}\n\n\`\`\`${lang}\n${codePart}\n\`\`\``;
    }

    const lines = answer.split('\n');
    let firstCodeIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const current = lines[i];
        const next = lines[i + 1] || '';

        if (looksLikeCodeLine(current) && (looksLikeCodeLine(next) || next.trim() === '' || i > 0)) {
            firstCodeIndex = i;
            break;
        }
    }

    if (firstCodeIndex !== -1) {
        const textPart = lines.slice(0, firstCodeIndex).join('\n').trim();
        const codePart = lines.slice(firstCodeIndex).join('\n').trim();
        const lang = detectCodeLanguage(category, codePart);

        if (textPart) {
            return `${textPart}\n\n\`\`\`${lang}\n${codePart}\n\`\`\``;
        }

        return `\`\`\`${lang}\n${codePart}\n\`\`\``;
    }

    return answer;
}

const QuestionCard = ({ question }) => {
    const [expanded, setExpanded] = useState(false);

    // 🔥 Compute markdown ONLY when opened
    const markdown = useMemo(() => {
        if (!expanded) return '';
        return normalizeAnswerToMarkdown(question.answer, question.category);
    }, [expanded, question.answer, question.category]);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{
                background:
                    'linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.018))',
                border: '1px solid rgba(255,255,255,0.055)',
                boxShadow: 'none',
                borderRadius: '10px !important',
                overflow: 'hidden',
                transition: 'all 0.18s ease',
                '&:hover': {
                    transform: 'translateY(-1px)',
                    borderColor: 'rgba(139,92,246,0.24)',
                },
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {question.title}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {!!question.tags?.length && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {question.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                )}

                {/* 🚀 Render answer ONLY when expanded */}
                {expanded && (
                    <Box sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                        <Suspense
                            fallback={
                                <Box sx={{ py: 2 }}>
                                    <CircularProgress size={20} />
                                </Box>
                            }
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ inline, className, children, ...props }) {
                                        const rawCode = String(children).replace(/\n$/, '');
                                        const match = /language-(\w+)/.exec(className || '');
                                        const detectedLanguage =
                                            match?.[1] ||
                                            detectCodeLanguage(question.category, rawCode);

                                        if (inline) {
                                            return (
                                                <Box
                                                    component="code"
                                                    sx={{
                                                        px: 0.7,
                                                        py: 0.25,
                                                        borderRadius: 1,
                                                        backgroundColor:
                                                            'rgba(255,255,255,0.08)',
                                                    }}
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
                                                    customStyle={{
                                                        borderRadius: '10px',
                                                        padding: '14px',
                                                        fontSize: '0.9rem',
                                                    }}
                                                >
                                                    {rawCode}
                                                </SyntaxHighlighter>
                                            </Box>
                                        );
                                    },
                                    p: ({ children }) => (
                                        <Typography sx={{ mb: 2 }}>{children}</Typography>
                                    ),
                                }}
                            >
                                {markdown}
                            </ReactMarkdown>
                        </Suspense>
                    </Box>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default memo(QuestionCard);