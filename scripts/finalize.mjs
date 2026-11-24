import fs from 'node:fs';
fs.writeFileSync('dist/_headers', [
  '/*',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  X-Frame-Options: SAMEORIGIN',
  '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
  '',
  '/assets/*',
  '  Cache-Control: public, max-age=0, must-revalidate',
  '',
  '/images/*',
  '  Cache-Control: public, max-age=0, must-revalidate',
  ''
].join('\n'));
fs.writeFileSync('dist/_redirects','/index.html / 301\n');
