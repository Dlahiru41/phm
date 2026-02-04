const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html') && !f.includes('home') && !f.includes('login-content'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract body content
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    let bodyContent = bodyMatch[1].trim();
    
    // Remove script tags that are in the body
    bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
    
    // Create TypeScript file name
    const baseName = path.basename(file, '.html');
    const tsFileName = baseName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Page.ts';
    
    const tsFilePath = path.join(pagesDir, tsFileName);
    
    // Create TypeScript content
    const tsContent = `export const ${baseName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Page = (): string => {
  return \`${bodyContent.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;
};
`;
    
    // Write TypeScript file
    fs.writeFileSync(tsFilePath, tsContent);
    console.log(`Created ${tsFileName}`);
  }
});

console.log('Conversion complete!');
