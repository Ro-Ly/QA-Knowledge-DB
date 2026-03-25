import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionCard from './QuestionCard';

const CategoryAccordion = ({ category, questions }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{ mb: 2, boxShadow: 1 }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {questions.map(question => (
                    <QuestionCard key={question.id} question={question} />
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default CategoryAccordion;