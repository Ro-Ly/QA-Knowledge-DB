const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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

function buildSearchText(item) {
    return [
        item.title || '',
        item.answer || '',
        ...(Array.isArray(item.tags) ? item.tags : []),
        item.category || '',
        item.subcategory || '',
    ]
        .join(' ')
        .toLowerCase();
}

function normalizeQuestion(item, index) {
    const answer = item.answer ?? '';
    const category = item.category ?? 'Uncategorized';
    const subcategory = item.subcategory ?? 'General';

    return {
        id: item.id ?? `question-${index}`,
        title: item.title ?? 'Untitled',
        answer,
        normalizedAnswer: normalizeAnswerToMarkdown(answer, category),
        tags: Array.isArray(item.tags) ? item.tags.map((t) => String(t)) : [],
        category,
        subcategory,
        _searchText: buildSearchText(item),
    };
}

export async function getAllQuestions() {
    const response = await fetch(`${API_BASE_URL}/questions`);

    if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Backend returned invalid questions payload');
    }

    return data.map(normalizeQuestion);
}