
const fs = require('fs');
const path = 'c:\\Users\\LENOVO\\Downloads\\udezein_data (7).json';
const outPath = 'analysis_result.txt';

try {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(outPath, `File not found: ${path}`);
        process.exit(1);
    }

    const content = fs.readFileSync(path, 'utf8');
    let data;
    try {
        data = JSON.parse(content);
    } catch (e) {
        fs.writeFileSync(outPath, `JSON Parse Error: ${e.message}`);
        process.exit(1);
    }

    const products = data.products || [];
    let output = `Loaded ${products.length} products from JSON.\n`;

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
        output += "Duplicates found in JSON:\n";
        duplicates.forEach(d => {
            output += `- "${d.name}" at index ${d.index} (Original at ${d.originalIndex})\n`;
        });
    } else {
        output += "No duplicates found in the provided JSON.\n";
    }

    // Check specifically for PU Stone
    const puStones = products.filter(p => p.name && p.name.toLowerCase().includes('pu stone'));
    output += `\n"PU Stone" entries count: ${puStones.length}\n`;
    puStones.forEach(p => {
        output += JSON.stringify(p, null, 2) + "\n";
    });

    fs.writeFileSync(outPath, output);
    console.log("Analysis written to " + outPath);

} catch (err) {
    fs.writeFileSync(outPath, `Error: ${err.message}`);
}
