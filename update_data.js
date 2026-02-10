import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = 'c:/Users/LENOVO/Downloads/udezein_data.json';
const targetPath = path.join(__dirname, 'src/data.js');

try {
    // Read the exported JSON
    if (!fs.existsSync(jsonPath)) {
        console.error(`File not found: ${jsonPath}`);
        process.exit(1);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(rawData);

    // Validate structure
    const products = data.products || [];
    const projects = data.projects || [];

    console.log(`Found ${products.length} products and ${projects.length} projects.`);

    // Construct the new file content
    const newContent = `
export const INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};

export const INITIAL_PROJECTS = ${JSON.stringify(projects, null, 2)};
`;

    // Write the file
    fs.writeFileSync(targetPath, newContent);
    console.log('Successfully updated src/data.js');

} catch (error) {
    console.error('Error updating data:', error);
    process.exit(1);
}
