const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Fix broken style attributes with backgroundImage
  // Match style={{"backgroundImage":"url(https..."}} and fix the URL
  content = content.replace(/style=\{\{"backgroundImage":"url\(https([^"]*)"\}\}/g, (match, urlPart) => {
    // Try to find the complete URL by looking ahead
    const fullMatch = content.match(/style=\{\{"backgroundImage":"url\(https[^)]*\)"\}\}/);
    if (fullMatch) {
      const urlMatch = fullMatch[0].match(/url\((https[^)]+)\)/);
      if (urlMatch) {
        return `style={{"backgroundImage": "url('${urlMatch[1]}')"}}`;
      }
    }
    return match;
  });
  
  // Better approach: find all style attributes and fix them properly
  // Look for style={{"backgroundImage":"url(https and find the closing
  const styleRegex = /style=\{\{"backgroundImage":"url\(https([^}]*)\}\}/g;
  let match;
  const replacements = [];
  
  while ((match = styleRegex.exec(content)) !== null) {
    const fullStyle = match[0];
    // Try to extract the complete URL by looking at the original TS file if it exists
    // For now, let's fix the common pattern
    if (fullStyle.includes('url(https') && !fullStyle.includes("')")) {
      // This is a broken style, we need to find the complete URL
      // The URL should end with a closing parenthesis and quote
      const urlStart = fullStyle.indexOf('url(https');
      const urlEnd = fullStyle.indexOf('")', urlStart);
      if (urlEnd > urlStart) {
        const url = fullStyle.substring(urlStart + 4, urlEnd + 1);
        const fixed = `style={{"backgroundImage": "url('${url}')"}}`;
        replacements.push({ old: fullStyle, new: fixed });
      }
    }
  }
  
  // Apply replacements
  replacements.forEach(({ old, new: newStyle }) => {
    content = content.replace(old, newStyle);
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed styles in ${file}`);
});

console.log('Style attributes fixed!');
