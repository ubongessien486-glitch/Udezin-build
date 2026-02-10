
const fs = require('fs');
const path = 'c:\\Users\\LENOVO\\Downloads\\udezein_data (7).json';

try {
    if (!fs.existsSync(path)) {
        console.error(`File not found: ${path}`);
        process.exit(1);
    }

    const content = fs.readFileSync(path, 'utf8');
    const data = JSON.parse(content);

    // App.jsx exports { products: [...], projects: [...] }
    const products = data.products || [];

    console.log(`Loaded ${products.length} products from JSON.`);

    const nameMap = {};
    const duplicates = [];

    products.forEach((p, index) => {
        const normName = p.name ? p.name.trim().toLowerCase() : '';
        if (normName && nameMap[normName]) {
            duplicates.push({ name: p.name, index, originalIndex: nameMap[normName].index });
        } else {
            nameMap[normName] = { index, data: p };
        }
    });

    if (duplicates.length > 0) {
        console.log("Duplicates found in JSON:");
        duplicates.forEach(d => {
            console.log(`- "${d.name}" at index ${d.index} (Original at ${d.originalIndex})`);
        });
    } else {
        console.log("No duplicates found in the provided JSON.");
    }

    // Check specifically for PU Stone
    const puStones = products.filter(p => p.name && p.name.toLowerCase().includes('pu stone'));
    console.log(`\n"PU Stone" entries: ${puStones.length}`);
    puStones.forEach(p => console.log(JSON.stringify(p, null, 2)));

} catch (err) {
    console.error("Error reading/parsing JSON:", err);
}
