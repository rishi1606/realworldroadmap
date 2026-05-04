const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = {
  'bg-white': 'bg-bg-surface',
  'bg-gray-50': 'bg-bg-base',
  'bg-gray-100': 'bg-border-subtle',
  'border-gray-100': 'border-border-subtle',
  'border-gray-200': 'border-border-subtle',
  'border-gray-300': 'border-border-subtle',
  'text-gray-900': 'text-text-main',
  'text-gray-800': 'text-text-main',
  'text-gray-700': 'text-text-muted',
  'text-gray-600': 'text-text-muted',
  'text-gray-500': 'text-text-muted',
  'text-gray-400': 'text-text-muted',
  'text-\\[#09090B\\]': 'text-text-main',
  'text-\\[#0f172a\\]': 'text-text-main',
  'text-\\[#64748b\\]': 'text-text-muted',
  'bg-\\[#09090B\\]': 'bg-text-main',
  'bg-\\[#f8f9fa\\]': 'bg-bg-base',
  'bg-\\[#FAFAFA\\]': 'bg-bg-surface',
  'hover:bg-\\[#09090B\\]\\/90': 'hover:bg-text-main/90',
  'hover:bg-gray-50': 'hover:bg-bg-base',
  'hover:bg-gray-100': 'hover:bg-border-subtle',
  'hover:bg-gray-200': 'hover:bg-border-subtle',
  'hover:text-gray-900': 'hover:text-text-main',
  'ring-gray-400': 'ring-border-subtle',
  'text-black': 'text-text-main',
  'border-black': 'border-text-main',
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const [search, replace] of Object.entries(replacements)) {
        // Use word boundaries for class names to avoid partial replacements
        // Wait, text-[#09090B] has brackets, so regex boundary \b might fail.
        // We can just use global replace with a simple regex or string replace.
        // Tailwind classes are usually surrounded by spaces, quotes, backticks, or are at the start/end.
        // A safer regex: /(?<=["'\s`])(SEARCH)(?=["'\s`])/g
        // But some are part of a template string like `text-white ${...}`
        
        // Let's use a simpler approach: splitting by regex and replacing exact tokens.
        // Actually, replacing string directly with regex boundary handling for tailwind:
        
        let regexStr = `(?<=["'\\s\`:]|^)${search}(?=["'\\s\`:]|$)`;
        let regex = new RegExp(regexStr, 'g');
        content = content.replace(regex, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
