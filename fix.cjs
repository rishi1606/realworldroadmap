const fs = require('fs');
const p = 'c:/Users/sr4ri/Desktop/TECH/src/data/mockData.js';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/\s*\{\s*type:\s*'h3',\s*text:\s*'The scenario'\s*\},/g, '');
c = c.replace(/<mark>/g, '<strong>').replace(/<\/mark>/g, '</strong>');
c = c.replace(/\{\s*type:\s*'code',\s*language:\s*'[^']+',\s*code:/g, m => m.includes('javascript') ? "{ type: 'code', filename: 'server.js', text:" : "{ type: 'code', filename: 'terminal.log', text:");

fs.writeFileSync(p, c);
