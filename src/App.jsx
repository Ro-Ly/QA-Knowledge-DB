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
                overflow: 'hidden',
            }}
        >
            {/* Abstract background graphics */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -120,
                    left: -100,
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)',
                    filter: 'blur(28px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 30,
                    right: -90,
                    width: 320,
                    height: 320,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(34,211,238,0.14), transparent 72%)',
                    filter: 'blur(34px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 260,
                    right: '14%',
                    width: 180,
                    height: 180,
                    transform: 'rotate(24deg)',
                    borderRadius: '28px',
                    border: '1px solid rgba(255,255,255,0.04)',
                    background:
                        'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(34,211,238,0.04))',
                    filter: 'blur(2px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* Hero */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    mb: 4,
                    px: { xs: 2.5, md: 4.5 },
                    py: { xs: 3, md: 4.5 },
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.07)',
                    background:
                        'linear-gradient(180deg, rgba(18,24,38,0.88) 0%, rgba(11,15,25,0.82) 100%)',
                    backdropFilter: 'blur(18px)',
                    boxShadow: '0 22px 60px rgba(0,0,0,0.34)',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'radial-gradient(circle at 14% 18%, rgba(139,92,246,0.10), transparent 22%), radial-gradient(circle at 86% 18%, rgba(34,211,238,0.08), transparent 22%)',
                        pointerEvents: 'none',
                    }}
                />

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                    <Chip label="📚 QA Prep" />
                    <Chip label="⚡ Fast Search" />
                    <Chip label="🧠 Structured Learning" />
                </Stack>

                <Typography
                    variant="h2"
                    sx={{
                        maxWidth: 920,
                        mb: 2,
                        fontSize: { xs: '2.1rem', md: '3.3rem' },
                        lineHeight: 1.05,
                    }}
                >
                    QA Interview Knowledge Base
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        maxWidth: 760,
                        mb: 3,
                        fontSize: { xs: '1rem', md: '1.05rem' },
                        lineHeight: 1.8,
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

            {/* Search / filters */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    mb: 4,
                    px: { xs: 2.5, md: 3 },
                    py: { xs: 2.5, md: 3 },
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(10, 14, 28, 0.76)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 16px 42px rgba(0,0,0,0.28)',
                }}
            >
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Explore the knowledge base
                </Typography>

                <SearchBar value={searchTerm} onChange={setSearchTerm} />

                <TagFilter
                    tags={allTags}
                    selectedTags={selectedTags}
                    onSelect={setSelectedTags}
                />
            </Box>

            {/* Results */}
            {Object.keys(groupedQuestions).length === 0 ? (
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        p: 3,
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.07)',
                        background: 'rgba(10, 14, 28, 0.68)',
                    }}
                >
                    <Typography variant="body1" color="text.secondary">
                        😶 No questions found. Try another keyword or remove some filters.
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