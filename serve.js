#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// تشغيل Vite preview على المنفذ 8080 للنشر على Replit
const vitePreview = spawn('npx', [
  'vite', 
  'preview', 
  '--host', 
  '0.0.0.0', 
  '--port', 
  '8080'
], {
  stdio: 'inherit',
  cwd: process.cwd()
});

vitePreview.on('close', (code) => {
  console.log(`Vite preview exited with code ${code}`);
  process.exit(code);
});

vitePreview.on('error', (err) => {
  console.error('Failed to start Vite preview:', err);
  process.exit(1);
});