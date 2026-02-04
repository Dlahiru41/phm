const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html') && !f.includes('-content'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract body content
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    let bodyContent = bodyMatch[1];
    
    // Remove script tags that are in the body (we'll handle them separately)
    bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
    
    // Create content file name
    const baseName = path.basename(file, '.html');
    const contentFileName = `${baseName}-content.html`;
    const contentFilePath = path.join(pagesDir, contentFileName);
    
    // Write content file
    fs.writeFileSync(contentFilePath, bodyContent.trim());
    console.log(`Created ${contentFileName}`);
  }
});

console.log('Content extraction complete!');
