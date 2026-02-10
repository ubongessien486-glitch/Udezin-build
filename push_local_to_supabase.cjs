const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Setup Supabase
const supabaseUrl = 'https://qakkayfzwkfggidyjxhf.supabase.co';
// Read key from src/supabase.js
const supabaseConfigPath = path.join(__dirname, 'src', 'supabase.js');
let realSupabaseKey = '';
try {
    const supabaseConfig = fs.readFileSync(supabaseConfigPath, 'utf8');
    const match = supabaseConfig.match(/supabaseKey\s*=\s*['"]([^'"]+)['"]/);
    if (match) {
        realSupabaseKey = match[1];
    }
} catch (e) {
    console.warn("Could not read src/supabase.js");
}

if (!realSupabaseKey) {
    console.error("Supabase key not found!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, realSupabaseKey);

async function pushToSupabase() {
    // 2. Read src/data.js
    const dataPath = path.join(__dirname, 'src', 'data.js');
    console.log(`Reading products from ${dataPath}...`);

    let products = [];
    try {
        const dataContent = fs.readFileSync(dataPath, 'utf8');
        // Extract the array using regex
        const match = dataContent.match(/export const INITIAL_PRODUCTS = (\[[\s\S]*?\]);/);

        if (!match) {
            console.error("Could not find INITIAL_PRODUCTS array in src/data.js");
            process.exit(1);
        }

        const productsArrayString = match[1];
        products = eval(productsArrayString);
        console.log(`Found ${products.length} products to push.`);

    } catch (err) {
        console.error("Error reading/parsing src/data.js:", err);
        process.exit(1);
    }

    // 3. Sync to Supabase
    console.log("Clearing existing Supabase products...");

    // Delete all rows
    const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .gt('id', 0); // Assuming IDs are positive numbers

    if (deleteError) {
        console.error("Error clearing Supabase products:", deleteError);
        return;
    }

    console.log("Inserting products...");
    const { error: insertError } = await supabase
        .from('products')
        .insert(products);

    if (insertError) {
        console.error("Error inserting products to Supabase:", insertError);
    } else {
        console.log("Supabase sync successful!");
    }
}

pushToSupabase();
