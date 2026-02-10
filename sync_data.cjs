
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Setup Supabase
const supabaseUrl = 'https://qakkayfzwkfggidyjxhf.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFha2theWZ6d2tmZ2dpZHlqeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNzI1MzIsImV4cCI6MjA1MjY1MjUzMn0.55m_y6_86_99_88_77_66_55_44_33_22_11'; // Placeholder, will try to read from file if needed
// Note: In a real scenario, use env vars. For this script, I'll read from src/supabase.js if possible or use a hardcoded fallback if I can find it.
// Checking src/supabase.js for exact key.

// Reading key from src/supabase.js to be safe
const supabaseConfigPath = path.join(__dirname, 'src', 'supabase.js');
let realSupabaseKey = '';
try {
    const supabaseConfig = fs.readFileSync(supabaseConfigPath, 'utf8');
    const match = supabaseConfig.match(/supabaseKey\s*=\s*['"]([^'"]+)['"]/);
    if (match) {
        realSupabaseKey = match[1];
    }
} catch (e) {
    console.warn("Could not read src/supabase.js, using fallback/placeholder key (might fail).");
}

if (!realSupabaseKey) {
    console.error("Supabase key not found!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, realSupabaseKey);

// 2. Read Source Data from src/data.js (Source of Truth)
const localDataPath = path.join(__dirname, 'src', 'data.js');
let localDataContent;
try {
    localDataContent = fs.readFileSync(localDataPath, 'utf8');
} catch (e) {
    console.error("Failed to read src/data.js:", e);
    process.exit(1);
}

// Extract INITIAL_PRODUCTS using regex
const productsMatch = localDataContent.match(/export const INITIAL_PRODUCTS = (\[[\s\S]*?\]);/);
let cleanedProducts = [];
if (productsMatch) {
    try {
        // Evaluate the string to get the object (careful with eval, but regex makes it safer-ish for data files)
        // Or better, just parse it if it's strict JSON. It looks like JSON structure in the file.
        cleanedProducts = JSON.parse(productsMatch[1]);
    } catch (e) {
        console.error("Failed to parse INITIAL_PRODUCTS from src/data.js. Ensure it is valid JSON syntax inside the array.");
        console.error(e);
        process.exit(1);
    }
} else {
    console.error("Could not find INITIAL_PRODUCTS in src/data.js");
    process.exit(1);
}

console.log(`Loaded ${cleanedProducts.length} products from src/data.js`);

// 3. (Optional) Filter Duplicates if needed, but relying on user editing src/data.js is safer now.
// We will just verify and sync what is in src/data.js.

// 5. Sync to Supabase
async function syncSupabase() {
    console.log("Syncing to Supabase...");

    // Option A: Delete all and re-insert (easiest for full sync, ensures removal of deleted items)
    // RISK: If verification fails, data is gone. But we have local JSON as backup.

    const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', 0); // Hack to delete all rows. usually .delete().gt('id', -1) or similar. 
    // Supabase requires a WHERE clause for delete. .neq('id', 0) matches almost everything if IDs are non-zero.
    // Better: .in('id', allIds)? No, deleting everything is cleaner to match source.
    // Let's try .gt('id', 0) since IDs are positive integers/timestamps.

    if (deleteError) {
        console.error("Error clearing Supabase products:", deleteError);
        return;
    }

    const { error: insertError } = await supabase
        .from('products')
        .insert(cleanedProducts);

    if (insertError) {
        console.error("Error inserting products to Supabase:", insertError);
    } else {
        console.log("Supabase sync successful!");
    }
}

syncSupabase();
