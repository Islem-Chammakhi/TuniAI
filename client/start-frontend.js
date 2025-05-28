// Simple script to start the frontend development server
import { execSync } from 'child_process';

console.log('Starting TuniTales frontend-only application...');

try {
  // Run the Vite development server directly from the client folder
  execSync('cd client && npx vite', { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting frontend:', error);
  process.exit(1);
}