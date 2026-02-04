const fs = require('fs');
const path = require('path');

// Known image URLs from the codebase
const imageUrls = {
  'Kavindu Perera': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4FqStuncYHDJVcXV1eGHedFHQNexdh-MCkH4enpMPrCnTsk0IwQp5ruXfUf0sQXx0swbm63qNcZogz0yK58ifP2EaW-62Ry5mSSBLUVFSSeCifAJGSbzw6jpqliEyGHT5aXWUn-65Y6kP4TpSah5Dau1aaXhcuaEkYGBQf0vvA5oOYtV4nwvv8x5yQQBhgocoJYZFc1blfhIVTGsTFeuerCyMOL6-Y6LNa8RsgCTiHu1GsPQhujFARmIbdXxhOcSTnG4FaH9T6syW',
  'Nimasha Perera': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxI93WCnxOCBxnS6TtEQUcq2M1DmcNC-gTqo2aipR44u4sTjhKbcE3914IGhbRe7tWAfUSUBc7Pp00VziFxoqXY--b0Wu6TJlJOTM6KC-apkUZKlO7vnbXtXXr-hHL4LCS-LrSXb7tbx9UWWO9AsXU9rTeCWIQiMuvTWXOowwGaQackLzBTqCV3cBdD3LOVzfD9uSiAQZz2nEfJY1JLSez8k5xsABqcBCDEwAQnCgrvW7HA_Io9dzkGbiQ25OUGmZU0-_AHmQnCrlS',
  'Amara Perera': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlSOFSDHf7m-OXjOd-0Wze2W8aWCqqFGlabt_2jSDf27FqTvgRD5JHhn7mqaBT2arZcqTGpYLwr_S3yFAQaJly-x3VwAGMiFnCSK7FeTRWyoiJHuVcR2G8ugVHSHe_36_7yC1vtJxqqa5IOync7N1766RjgK-jBX9I3knh0RHycTsKtR_s5cKmpzk56u5uPS1b0THIcJTvUsqti_HqemgAR7VQaAzQgRS5AJ9F0TgtT9eqVoa3X-ROaDX3I-JoEzbN_qt6YmY3EY_c',
  'Arjun Perera': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKXlUZHsgUSxm7Q84g78iIxLH0Ofbgf__85sfdUmKYxHPlK3vgE6h8NPrMtjHrPbCyqBqVXgDGSvUWyUuv5F1fs5sKmNSHkmXccLS4UFy1hMkFy1swaupzVVPL2tFm_3O6RXAzLNRAYYHaXlGBvz7ciyUTbH8oFj3x-oAVt_xLrWQuNEgn1rNSgHpM4lx1KUN4mClcSg-czC2lb9DEMkYcu8ZzcatrRPLFhYVhi93l4Y4aetTCTGNKIc_B8x1G-dnm5RPEQJgceuu2',
  'Samadhi Perera': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhtRBO8efVnpru_xZfSLZgNM2_L2QvrvqBdyEVH1eJTgT5A9yDAVmMS8cQUinwxT_zFeKNlXOoHbK8GIyQPgoCzz_q4FfcvNWN7dTkmHdmgGHqglnUCrCkF4umSaoX-da8Xm-Pa2TVUpJCV6nBIv6axN4sXuajcvwxR-XrzhhSd172MJWu28-QXzJRbNi_PqJcrE804Q3crUnIDDuPWSzEDwo7JGwpmFfIYaqdDVXRqquE6stug9JhYKHu6gYgs72l_qB7EnR4qb2r',
  'default': 'https://via.placeholder.com/150'
};

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;
  
  // Fix broken style attributes
  // Pattern: style={{"backgroundImage":"url(https"}}
  const brokenStyleRegex = /style=\{\{"backgroundImage":"url\(https[^}]*\}\}/g;
  
  content = content.replace(brokenStyleRegex, (match) => {
    changed = true;
    // Try to find context to determine which image URL to use
    const contextBefore = content.substring(Math.max(0, content.indexOf(match) - 200), content.indexOf(match));
    const contextAfter = content.substring(content.indexOf(match) + match.length, Math.min(content.length, content.indexOf(match) + match.length + 200));
    
    let url = imageUrls['default'];
    
    // Try to match based on context
    if (contextBefore.includes('Kavindu') || contextAfter.includes('Kavindu')) {
      url = imageUrls['Kavindu Perera'];
    } else if (contextBefore.includes('Nimasha') || contextAfter.includes('Nimasha')) {
      url = imageUrls['Nimasha Perera'];
    } else if (contextBefore.includes('Amara') || contextAfter.includes('Amara')) {
      url = imageUrls['Amara Perera'];
    } else if (contextBefore.includes('Arjun') || contextAfter.includes('Arjun')) {
      url = imageUrls['Arjun Perera'];
    } else if (contextBefore.includes('Samadhi') || contextAfter.includes('Samadhi')) {
      url = imageUrls['Samadhi Perera'];
    }
    
    return `style={{"backgroundImage": "url('${url}')"}}`;
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  }
});

console.log('Style fixes complete!');
