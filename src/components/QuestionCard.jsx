import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';

const QuestionCard = ({ question }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {question.title}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                    {question.tags?.map(tag => (
                        <Chip key={tag} label={tag} size="small" />
                    ))}
                </Stack>

                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {question.answer}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default QuestionCard;