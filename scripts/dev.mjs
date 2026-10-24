import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { generateContent } from './content.mjs';
await generateContent();
let timer;
let generating = Promise.resolve();
const watcher = watch('src/content', { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    generating = generating
      .then(() => generateContent())
      .catch((error) => console.error(error.message));
  }, 150);
});
const child = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'dev', ...process.argv.slice(2)],
  { stdio: 'inherit' },
);
function stop() {
  watcher.close();
  clearTimeout(timer);
  child.kill();
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
child.on('exit', (code) => {
  watcher.close();
  process.exit(code ?? 0);
});
