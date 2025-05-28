// Frontend-only starter script
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = join(__dirname, 'client');

console.log('Starting TuniTales frontend-only application...');
console.log('This version uses local data instead of a backend server.');

// Run the Vite development server with our custom config
const viteProcess = spawn('npx', ['vite', '--config', 'vite.config.js'], {
  cwd: clientDir,
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (error) => {
  console.error('Failed to start Vite server:', error);
  process.exit(1);
});

process.on('SIGINT', () => {
  viteProcess.kill('SIGINT');
  process.exit(0);
});