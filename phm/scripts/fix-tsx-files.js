const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove HTML comments
  content = content.replace(/<!--[\s\S]*?-->/g, '');
  
  // Fix style attributes - convert style="..." to style={{...}}
  content = content.replace(/style="([^"]*)"/g, (match, styleContent) => {
    const styleObj = {};
    styleContent.split(';').forEach(prop => {
      const trimmed = prop.trim();
      if (trimmed) {
        const [key, ...valueParts] = trimmed.split(':');
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim().replace(/['"]/g, '');
          const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          styleObj[camelKey] = value;
        }
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });
  
  // Fix style='...' attributes
  content = content.replace(/style='([^']*)'/g, (match, styleContent) => {
    const styleObj = {};
    styleContent.split(';').forEach(prop => {
      const trimmed = prop.trim();
      if (trimmed) {
        const [key, ...valueParts] = trimmed.split(':');
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim().replace(/['"]/g, '');
          const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          styleObj[camelKey] = value;
        }
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });
  
  // Fix &amp; to &
  content = content.replace(/&amp;/g, '&');
  
  // Fix <br/> to proper JSX
  content = content.replace(/<br\/>/g, '<br />');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
});

console.log('All TSX files fixed!');
