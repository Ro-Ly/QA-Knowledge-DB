import React, {
    useState,
    useEffect,
    useMemo,
    useDeferredValue,
} from 'react';
import { Box, Typography, Stack, Chip, CircularProgress } from '@mui/material';
import SearchBar from './components/SearchBar';
import TagFilter from './components/TagFilter';
import CategoryAccordion from './components/CategoryAccordion';
import QuestionCard from './components/QuestionCard';
import { getAllQuestions } from './data';

function useDebouncedValue(value, delay = 180) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}

function App() {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const debouncedSearch = useDebouncedValue(searchTerm, 180);
    const deferredSearch = useDeferredValue(debouncedSearch);

    useEffect(() => {
        const loadQuestions = async () => {
            setIsLoading(true);

            const data = await getAllQuestions();

            const prepared = data.map((q, index) => ({
                ...q,
                id:
                    q.id ??
                    `${q.category || 'uncategorized'}-${q.subcategory || 'general'}-${index}`,
                _searchText:
                    q._searchText ??
                    `${q.title || ''} ${q.answer || ''} ${(q.tags || []).join(' ')}`
                        .toLowerCase(),
            }));

            setQuestions(prepared);
            setIsLoading(false);
        };

        loadQuestions();
    }, []);

    const allTags = useMemo(() => {
        return [...new Set(questions.flatMap((q) => q.tags || []))].sort((a, b) =>
            a.localeCompare(b)
        );
    }, [questions]);

    const normalizedSearch = deferredSearch.trim().toLowerCase();
    const isSearchMode = normalizedSearch.length > 0;

    const filteredQuestions = useMemo(() => {
        return questions.filter((question) => {
            const matchesSearch = normalizedSearch
                ? question._searchText.includes(normalizedSearch)
                : true;

            const matchesTags =
                selectedTags.length === 0
                    ? true
                    : selectedTags.every((tag) => (question.tags || []).includes(tag));

            return matchesSearch && matchesTags;
        });
    }, [questions, normalizedSearch, selectedTags]);

    const groupedQuestions = useMemo(() => {
        if (isSearchMode) return {};

        return filteredQuestions.reduce((acc, question) => {
            const category = question.category || 'Uncategorized';
            const subcategory = question.subcategory || 'General';

            if (!acc[category]) acc[category] = {};
            if (!acc[category][subcategory]) acc[category][subcategory] = [];

            acc[category][subcategory].push(question);
            return acc;
        }, {});
    }, [filteredQuestions, isSearchMode]);

    const groupedEntries = useMemo(() => {
        if (isSearchMode) return [];
        return Object.entries(groupedQuestions);
    }, [groupedQuestions, isSearchMode]);

    const flatSearchResults = useMemo(() => {
        if (!isSearchMode) return [];

        return [...filteredQuestions].sort((a, b) => {
            const aTitle = a.title || '';
            const bTitle = b.title || '';

            const aStarts = aTitle.toLowerCase().startsWith(normalizedSearch);
            const bStarts = bTitle.toLowerCase().startsWith(normalizedSearch);

            if (aStarts !== bStarts) {
                return aStarts ? -1 : 1;
            }

            const aCategory = a.category || '';
            const bCategory = b.category || '';

            if (aCategory !== bCategory) {
                return aCategory.localeCompare(bCategory);
            }

            return aTitle.localeCompare(bTitle);
        });
    }, [filteredQuestions, isSearchMode, normalizedSearch]);

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
                    <Chip
                        label={
                            isSearchMode
                                ? `${flatSearchResults.length} results`
                                : `${groupedEntries.length} categories`
                        }
                    />
                    <Chip label={`${allTags.length} tags`} />
                </Stack>
            </Box>

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
                    {isSearchMode ? 'Search results' : 'Explore the knowledge base'}
                </Typography>

                <SearchBar value={searchTerm} onChange={setSearchTerm} />

                <TagFilter
                    tags={allTags}
                    selectedTags={selectedTags}
                    onSelect={setSelectedTags}
                />

                {isSearchMode && !isLoading && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                    >
                        Found {flatSearchResults.length} matching question
                        {flatSearchResults.length === 1 ? '' : 's'} for "{deferredSearch}".
                    </Typography>
                )}
            </Box>

            {isLoading ? (
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        p: 4,
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.07)',
                        background: 'rgba(10, 14, 28, 0.68)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    <CircularProgress size={24} />
                    <Typography variant="body1" color="text.secondary">
                        Loading knowledge base...
                    </Typography>
                </Box>
            ) : filteredQuestions.length === 0 ? (
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
            ) : isSearchMode ? (
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'grid',
                        gap: 1.25,
                    }}
                >
                    {flatSearchResults.map((question) => (
                        <Box key={question.id}>
                            <Box
                                sx={{
                                    mb: 0.75,
                                    px: 0.25,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    alignItems: 'center',
                                }}
                            >
                                <Chip
                                    size="small"
                                    label={question.category || 'Uncategorized'}
                                    sx={{
                                        backgroundColor: 'rgba(139,92,246,0.12)',
                                        border: '1px solid rgba(139,92,246,0.22)',
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {question.subcategory || 'General'}
                                </Typography>
                            </Box>

                            <QuestionCard question={question} />
                        </Box>
                    ))}
                </Box>
            ) : (
                groupedEntries.map(([category, subcategories]) => (
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