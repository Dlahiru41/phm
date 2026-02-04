const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.ts') && !f.includes('PageLoader'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract the HTML content from the template string
  const match = content.match(/return\s+`([\s\S]*)`;/);
  if (match) {
    let htmlContent = match[1];
    
    // Convert class to className
    htmlContent = htmlContent.replace(/class=/g, 'className=');
    
    // Convert style='...' to style={{...}}
    htmlContent = htmlContent.replace(/style='([^']*)'/g, (match, styleContent) => {
      // Convert CSS style string to React style object
      const styleObj = {};
      styleContent.split(';').forEach(prop => {
        const [key, value] = prop.split(':').map(s => s.trim());
        if (key && value) {
          const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          styleObj[camelKey] = value.replace(/['"]/g, '');
        }
      });
      return `style={${JSON.stringify(styleObj)}}`;
    });
    
    // Convert &amp; to &
    htmlContent = htmlContent.replace(/&amp;/g, '&');
    
    // Create TSX file name
    const tsxFileName = file.replace('.ts', '.tsx');
    const tsxFilePath = path.join(pagesDir, tsxFileName);
    
    // Get component name
    const componentMatch = content.match(/export const (\w+)/);
    const componentName = componentMatch ? componentMatch[1] : 'Component';
    
    // Create TSX content
    const tsxContent = `import React from 'react';

export const ${componentName}: React.FC = () => {
  return (
    <>
${htmlContent.split('\n').map(line => '      ' + line).join('\n')}
    </>
  );
};
`;
    
    // Write TSX file
    fs.writeFileSync(tsxFilePath, tsxContent);
    console.log(`Created ${tsxFileName}`);
  }
});

console.log('Conversion complete!');
