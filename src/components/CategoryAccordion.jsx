import React, { useState } from 'react';
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

    const totalQuestions = Object.values(subcategories).reduce(
        (sum, questions) => sum + questions.length,
        0
    );

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{ mb: 2.5 }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
                    <Typography variant="h5">{category}</Typography>
                    <Chip label={`📘 ${totalQuestions}`} size="small" />
                </Box>
            </AccordionSummary>

            <AccordionDetails>
                {Object.entries(subcategories).map(([subcategory, questions]) => (
                    <Accordion
                        key={subcategory}
                        sx={{
                            mb: 2,
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            boxShadow: 'none',
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
                                <Typography variant="h6">
                                    ✨ {subcategory}
                                </Typography>
                                <Chip label={`${questions.length} questions`} size="small" />
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ display: 'grid', gap: 1.25 }}>
                                {questions.map((question) => (
                                    <QuestionCard key={question.id} question={question} />
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default CategoryAccordion;