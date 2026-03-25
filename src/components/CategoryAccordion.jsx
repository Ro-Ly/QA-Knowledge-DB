import React, { useState, useMemo, memo } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionCard from './QuestionCard';

const CategoryAccordion = ({ category, subcategories }) => {
    const [expanded, setExpanded] = useState(false);
    const [expandedSub, setExpandedSub] = useState(null);

    const totalQuestions = useMemo(() => {
        return Object.values(subcategories).reduce(
            (sum, questions) => sum + questions.length,
            0
        );
    }, [subcategories]);

    const subcategoryEntries = useMemo(() => {
        return Object.entries(subcategories);
    }, [subcategories]);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{
                mb: 2.25,
                borderRadius: '14px !important',
                overflow: 'hidden',
                background:
                    'linear-gradient(180deg, rgba(16,22,35,0.96) 0%, rgba(11,15,25,0.96) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 14px 36px rgba(0,0,0,0.24)',
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    minHeight: 66,
                    '& .MuiAccordionSummary-content': {
                        my: 1.2,
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        pr: 1,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                background:
                                    'linear-gradient(135deg, rgba(139,92,246,1), rgba(34,211,238,1))',
                                boxShadow:
                                    '0 0 18px rgba(139,92,246,0.45), 0 0 24px rgba(34,211,238,0.18)',
                                flexShrink: 0,
                            }}
                        />
                        <Typography variant="h5">{category}</Typography>
                    </Box>

                    <Chip label={`${totalQuestions}`} size="small" />
                </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ pt: 0.5 }}>
                {/* 🚀 Render subcategories ONLY when category expanded */}
                {expanded &&
                    subcategoryEntries.map(([subcategory, questions]) => {
                        const isSubExpanded = expandedSub === subcategory;

                        return (
                            <Accordion
                                key={subcategory}
                                expanded={isSubExpanded}
                                onChange={() =>
                                    setExpandedSub(isSubExpanded ? null : subcategory)
                                }
                                sx={{
                                    mb: 1.75,
                                    borderRadius: '12px !important',
                                    background:
                                        'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.015))',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    boxShadow: 'none',
                                    overflow: 'hidden',
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        minHeight: 58,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 2,
                                            pr: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: 'text.primary',
                                                opacity: 0.95,
                                            }}
                                        >
                                            {subcategory}
                                        </Typography>

                                        <Chip
                                            label={`${questions.length} questions`}
                                            size="small"
                                        />
                                    </Box>
                                </AccordionSummary>

                                <AccordionDetails sx={{ pt: 0.5 }}>
                                    {/* 🚀 Render questions ONLY when subcategory expanded */}
                                    {isSubExpanded && (
                                        <Box sx={{ display: 'grid', gap: 1.1 }}>
                                            {questions.map((question) => (
                                                <QuestionCard
                                                    key={question.id}
                                                    question={question}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
            </AccordionDetails>
        </Accordion>
    );
};

export default memo(CategoryAccordion);