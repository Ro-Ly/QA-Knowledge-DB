import { useEffect, useMemo, useState } from 'react';
import {
    Box,
    CircularProgress,
    Container,
    CssBaseline,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchBar from './components/SearchBar';
import TagFilter from './components/TagFilter';
import CategoryAccordion from './components/CategoryAccordion';
import { getAllQuestions } from './data';
import theme from './theme';

function App() {
    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                setIsLoading(true);
                setError('');

                const data = await getAllQuestions();
                setQuestions(data);
            } catch (e) {
                console.error('Failed to load questions:', e);
                setError(e.message || 'Failed to load questions');
            } finally {
                setIsLoading(false);
            }
        };

        loadQuestions();
    }, []);

    const tags = useMemo(() => {
        const uniqueTags = new Set();

        questions.forEach((question) => {
            (question.tags || []).forEach((tag) => uniqueTags.add(tag));
        });

        return Array.from(uniqueTags).sort((a, b) => a.localeCompare(b));
    }, [questions]);

    const filteredQuestions = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return questions.filter((question) => {
            const matchesSearch =
                !normalizedSearch ||
                question._searchText?.includes(normalizedSearch) ||
                question.title?.toLowerCase().includes(normalizedSearch) ||
                question.answer?.toLowerCase().includes(normalizedSearch);

            const matchesTag =
                !selectedTag || (question.tags || []).includes(selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [questions, search, selectedTag]);

    const groupedQuestions = useMemo(() => {
        return filteredQuestions.reduce((acc, question) => {
            const category = question.category || 'Uncategorized';
            const subcategory = question.subcategory || 'General';

            if (!acc[category]) {
                acc[category] = {};
            }

            if (!acc[category][subcategory]) {
                acc[category][subcategory] = [];
            }

            acc[category][subcategory].push(question);
            return acc;
        }, {});
    }, [filteredQuestions]);

    const totalVisibleQuestions = filteredQuestions.length;
    const totalQuestions = questions.length;

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    py: { xs: 4, md: 6 },
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h3" component="h1" gutterBottom>
                                QA Knowledge DB
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                База вопросов и ответов для подготовки к собеседованиям по QA.
                            </Typography>
                        </Box>

                        <Divider />

                        <Stack spacing={2}>
                            <SearchBar
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Поиск по вопросам, ответам и тегам..."
                                InputProps={{
                                    endAdornment: search ? (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="clear search"
                                                edge="end"
                                                onClick={() => setSearch('')}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ) : null,
                                }}
                            />

                            <TagFilter
                                tags={tags}
                                selectedTag={selectedTag}
                                onChange={setSelectedTag}
                            />

                            <Typography variant="body2" color="text.secondary">
                                Показано {totalVisibleQuestions} из {totalQuestions} вопросов
                            </Typography>
                        </Stack>

                        {isLoading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    py: 10,
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : error ? (
                            <Box
                                sx={{
                                    py: 6,
                                    px: 3,
                                    borderRadius: 2,
                                    backgroundColor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Typography variant="h6" gutterBottom color="error">
                                    Не удалось загрузить данные
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {error}
                                </Typography>
                            </Box>
                        ) : totalVisibleQuestions === 0 ? (
                            <Box
                                sx={{
                                    py: 6,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    backgroundColor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Ничего не найдено
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Попробуй изменить поисковый запрос или сбросить фильтр по тегу.
                                </Typography>
                            </Box>
                        ) : (
                            <Stack spacing={2}>
                                {Object.entries(groupedQuestions).map(([category, subcategories]) => (
                                    <CategoryAccordion
                                        key={category}
                                        category={category}
                                        subcategories={subcategories}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default App;