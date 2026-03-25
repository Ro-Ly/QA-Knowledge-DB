import fs from 'fs';
import path from 'path';

// This would be replaced with actual file loading in a real app
// For demo purposes, we'll use mock data

const getAllQuestions = async () => {
    // In a real app, you would dynamically import all JSON files
    // Here's a mock implementation
    return [
        {
            id: 1,
            title: "How to use Git?",
            tags: ["git", "version-control"],
            answer: "```bash\ngit init\n```",
            category: "Development"
        },
        {
            id: 2,
            title: "CSS Flexbox basics",
            tags: ["css", "layout"],
            answer: "Flexbox is a layout model...",
            category: "Design"
        }
    ];
};

export { getAllQuestions };
