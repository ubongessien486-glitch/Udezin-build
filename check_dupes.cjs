
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data.js');

try {
    const dataContent = fs.readFileSync(dataPath, 'utf8');

    // Extract the array using regex
    const match = dataContent.match(/export const INITIAL_PRODUCTS = (\[[\s\S]*?\]);/);

    if (!match) {
        console.error("Could not find INITIAL_PRODUCTS array in src/data.js");
        process.exit(1);
    }

    const productsArrayString = match[1];

    // We need to make it valid JSON to parse it, or valid JS to eval it.
    // Since it might contain unquoted keys or comments, eval is suppressed but `new Function` is safer
    // Actually, let's just use eval in a safe way for this local script
    const products = eval(productsArrayString);

    console.log(`Found ${products.length} products.`);

    const idMap = {};
    const nameMap = {};
    const duplicates = [];

    products.forEach((p, index) => {
        if (idMap[p.id]) {
            duplicates.push({ type: 'ID', value: p.id, index, originalIndex: idMap[p.id] });
        } else {
            idMap[p.id] = index;
        }

        // Normalize name for check
        const normName = p.name ? p.name.trim().toLowerCase() : '';
        if (normName && nameMap[normName]) {
            duplicates.push({ type: 'Name', value: p.name, index, originalIndex: nameMap[normName] });
        } else {
            nameMap[normName] = index;
        }
    });

    if (duplicates.length > 0) {
        console.log("Duplicates found:");
        duplicates.forEach(d => {
            console.log(`- Type: ${d.type}, Value: "${d.value}", Index: ${d.index} (Original at ${d.originalIndex})`);
        });
    } else {
        console.log("No duplicates found.");
    }

} catch (err) {
    console.error("Error:", err);
}
