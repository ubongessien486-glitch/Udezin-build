
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'udezein_final_data.json');
const imagesDir = path.join(__dirname, 'public', 'images');
const outputJsPath = path.join(__dirname, 'src', 'data.js');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const rawData = fs.readFileSync(dataFilePath, 'utf8');
const data = JSON.parse(rawData);

function processItems(items, type) {
    if (!items) return [];
    return items.map(item => {
        if (item.image && item.image.startsWith('data:image')) {
            const matches = item.image.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
            if (matches) {
                const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                const base64Data = matches[2];
                const buffer = Buffer.from(base64Data, 'base64');
                // Use ID if available, otherwise just use a random string/index to avoid collision
                // But projects might share IDs with products? Unlikely but good to be safe with prefix
                const filename = `${type}_${item.id}.${ext}`;
                const filePath = path.join(imagesDir, filename);
                fs.writeFileSync(filePath, buffer);
                item.image = `/images/${filename}`;
                console.log(`Saved ${filename}`);
            }
        }
        return item;
    });
}

const processedProducts = processItems(data.products, 'product');
const processedProjects = processItems(data.projects, 'project');

const fileContent = `
export const INITIAL_PRODUCTS = ${JSON.stringify(processedProducts, null, 2)};

export const INITIAL_PROJECTS = ${JSON.stringify(processedProjects, null, 2)};
`;

fs.writeFileSync(outputJsPath, fileContent, 'utf8');
console.log('Successfully processed data and saved to src/data.js');
