## Adding New Content

1. Create a new folder in `src/data/` for your category
2. Add JSON files with this structure:
```json
{
  "id": 1,
  "title": "Question title",
  "tags": ["tag1", "tag2"],
  "answer": "Answer with ```code blocks```",
  "category": "Category name"
}
```

## Deployment

The app is automatically deployed to GitHub Pages using the workflow in `.github/workflows/deploy.yml`. Changes pushed to the `main` branch will trigger a new deployment.

## Notes

- The current implementation uses mock data in `src/data/index.js`
- For production use, replace the mock data with dynamic loading using `import.meta.glob` in Vite
- Code blocks in answers use triple-backtick syntax with language specifiers
