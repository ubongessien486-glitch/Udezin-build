const fs = require('fs');
const path = require('path');

const projectRoot = '.';
const outputFile = 'udezin.md';

const filesToBackup = [
    'package.json',
    'vercel.json',
    'vite.config.js',
    'index.html',
    'src/main.jsx',
    'src/App.jsx',
    'src/index.css',
    'src/data.js',
    'src/supabase.js',
    // Components
    'src/components/Navbar.jsx',
    'src/components/Footer.jsx',
    'src/components/Hero.jsx',
    'src/components/Services.jsx',
    'src/components/SiteWorksGallery.jsx',
    'src/components/PHShowcase.jsx',
    'src/components/AdminDashboard.jsx',
    'src/components/CartSidebar.jsx',
    'src/components/MaterialCatalog.jsx',
    // Pages
    'src/pages/Home.jsx',
    'src/pages/Products.jsx'
];

let outputContent = '';

filesToBackup.forEach(file => {
    try {
        const filePath = path.join(projectRoot, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(file).substring(1);
            let lang = ext;
            if (ext === 'js' || ext === 'jsx' || ext === 'cjs' || ext === 'mjs') lang = 'javascript';
            if (ext === 'json') lang = 'json';
            if (ext === 'html') lang = 'html';
            if (ext === 'css') lang = 'css';

            outputContent += `## ${file}\n`;
            outputContent += '```' + lang + '\n';
            outputContent += content + '\n';
            outputContent += '```\n\n';
            console.log(`Processed ${file}`);
        } else {
            console.warn(`Skipping missing file: ${file}`);
        }
    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

fs.writeFileSync(outputFile, outputContent);
console.log(`Backup written to ${outputFile}`);
