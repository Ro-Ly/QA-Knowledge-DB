import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'QA-Knowledge-DB';

export default defineConfig(({ mode }) => ({
    plugins: [react()],
    base: mode === 'github-pages' ? `/${repoName}/` : '/',
}));