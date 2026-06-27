import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const base = 'src/pages/zh';

function check(dir) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) {
      check(full);
    } else if (e.endsWith('.astro')) {
      const content = readFileSync(full, 'utf-8');
      const m = content.match(/^const title = .*/m);
      if (m) {
        const line = m[0];
        // Check if line has issues: unmatched quotes, broken strings
        if (line.includes("'ts") || line.includes('"ts') || line.includes("'t know") || (line.match(/['"]/g) || []).length % 2 !== 0) {
          console.log('BROKEN: ' + relative(base, full));
          console.log('  ' + line);
        }
      }
    }
  }
}
check(base);
