import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import SearchBar from './components/SearchBar';
import TagFilter from './components/TagFilter';
import CategoryAccordion from './components/CategoryAccordion';
import { getAllQuestions } from './data';

function App() {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        const loadQuestions = async () => {
            const data = await getAllQuestions();
            setQuestions(data);
            setAllTags([...new Set(data.flatMap((q) => q.tags || []))]);
        };

        loadQuestions();
    }, []);

    const filteredQuestions = questions.filter((question) => {
        const title = question.title || '';
        const answer = question.answer || '';

        const matchesSearch = searchTerm
            ? title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            answer.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        const matchesTags =
            selectedTags.length === 0
                ? true
                : selectedTags.every((tag) => (question.tags || []).includes(tag));

        return matchesSearch && matchesTags;
    });

    const groupedQuestions = filteredQuestions.reduce((acc, question) => {
        const category = question.category || 'Uncategorized';
        const subcategory = question.subcategory || 'General';

        if (!acc[category]) acc[category] = {};
        if (!acc[category][subcategory]) acc[category][subcategory] = [];

        acc[category][subcategory].push(question);
        return acc;
    }, {});

    return (
        <Box
            sx={{
                position: 'relative',
                maxWidth: 1180,
                mx: 'auto',
                px: { xs: 2, md: 4 },
                py: { xs: 4, md: 7 },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -80,
                    left: -80,
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(155,140,255,0.14), transparent 70%)',
                    filter: 'blur(18px)',
                    pointerEvents: 'none',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 40,
                    right: -60,
                    width: 260,
                    height: 260,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(53,224,255,0.10), transparent 70%)',
                    filter: 'blur(26px)',
                    pointerEvents: 'none',
                }}
            />

            <Box
                sx={{
                    position: 'relative',
                    mb: 5,
                    p: { xs: 3, md: 5 },
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    backdropFilter: 'blur(18px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.36)',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'radial-gradient(circle at 15% 20%, rgba(155,140,255,0.10), transparent 22%), radial-gradient(circle at 88% 22%, rgba(53,224,255,0.08), transparent 22%)',
                        pointerEvents: 'none',
                    }}
                />

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                    <Chip label="Dark mode" />
                    <Chip label="Fast search" />
                    <Chip label="QA knowledge base" />
                </Stack>

                <Typography
                    variant="h3"
                    sx={{
                        maxWidth: 900,
                        mb: 2,
                        fontSize: { xs: '2.2rem', md: '3.8rem' },
                    }}
                >
                    QA Interview Knowledge Base
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                        maxWidth: 760,
                        mb: 3,
                        fontWeight: 400,
                        lineHeight: 1.7,
                    }}
                >
                    Curated questions, concise explanations, code examples, and searchable topics
                    across QA, automation, APIs, SQL, Java, architecture, and testing practices.
                </Typography>

                <Stack direction="row" spacing={1.2} useFlexGap flexWrap="wrap">
                    <Chip label={`${questions.length} questions`} />
                    <Chip label={`${Object.keys(groupedQuestions).length} categories`} />
                    <Chip label={`${allTags.length} tags`} />
                </Stack>
            </Box>

            <Box
                sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 7,
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(10, 14, 28, 0.74)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 16px 45px rgba(0,0,0,0.30)',
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Explore the knowledge base
                </Typography>

                <SearchBar value={searchTerm} onChange={setSearchTerm} />

                <TagFilter
                    tags={allTags}
                    selectedTags={selectedTags}
                    onSelect={setSelectedTags}
                />
            </Box>

            {Object.keys(groupedQuestions).length === 0 ? (
                <Box
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(10, 14, 28, 0.68)',
                    }}
                >
                    <Typography variant="body1" color="text.secondary">
                        No questions found.
                    </Typography>
                </Box>
            ) : (
                Object.entries(groupedQuestions).map(([category, subcategories]) => (
                    <CategoryAccordion
                        key={category}
                        category={category}
                        subcategories={subcategories}
                    />
                ))
            )}
        </Box>
    );
}

export default App;