function detectCodeLanguage(category, code) {
    const c = (category || '').toLowerCase();
    const codeTrim = (code || '').trim();

    if (c.includes('sql')) return 'sql';
    if (c.includes('java')) return 'java';
    if (c.includes('git')) return 'bash';
    if (c.includes('http')) return 'http';
    if (codeTrim.startsWith('{') || codeTrim.startsWith('[')) return 'json';

    if (codeTrim.includes('System.out.println') || codeTrim.includes('class '))
        return 'java';

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

export async function getAllQuestions() {
    const modules = import.meta.glob('./**/*.json');

    const loaded = await Promise.all(
        Object.entries(modules).map(async ([filePath, loader]) => {
            const mod = await loader();
            const data = mod.default;

            const parts = filePath.replace('./', '').split('/');
            const categoryFromPath = parts[0] ?? 'Uncategorized';
            const subcategoryFromPath =
                parts.length > 2 ? parts[1] : 'General';

            const normalizeItem = (item, index) => {
                const category = item.category ?? categoryFromPath;
                const subcategory = item.subcategory ?? subcategoryFromPath;
                const answer = item.answer ?? '';

                const normalizedAnswer = normalizeAnswerToMarkdown(
                    answer,
                    category
                );

                return {
                    id: item.id ?? `${filePath}-${index}`,
                    title: item.title ?? 'Untitled',
                    answer,
                    normalizedAnswer, // 🔥 precomputed
                    tags: Array.isArray(item.tags)
                        ? item.tags.map((t) => String(t))
                        : [],
                    category,
                    subcategory,

                    // 🔥 precomputed search field
                    _searchText: `${item.title || ''} ${answer} ${(item.tags || []).join(' ')}`
                        .toLowerCase(),
                };
            };

            if (Array.isArray(data)) {
                return data.map(normalizeItem);
            }

            return [normalizeItem(data, 0)];
        })
    );

    const flat = loaded.flat();

    // 🚀 Faster deduplication using Map
    const map = new Map();

    for (const item of flat) {
        const key = `${item.title}__${item.category}__${item.subcategory}`;
        if (!map.has(key)) {
            map.set(key, item);
        }
    }

    return Array.from(map.values());
}