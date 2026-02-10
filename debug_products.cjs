
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qakkayfzwkfggidyjxhf.supabase.co';
// Try to read key from src/supabase.js
const supabaseConfigPath = path.join(__dirname, 'src', 'supabase.js');
let realSupabaseKey = '';
try {
    const supabaseConfig = fs.readFileSync(supabaseConfigPath, 'utf8');
    const match = supabaseConfig.match(/supabaseKey\s*=\s*['"]([^'"]+)['"]/);
    if (match) realSupabaseKey = match[1];
} catch (e) { }

if (!realSupabaseKey) realSupabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFha2theWZ6d2tmZ2dpZHlqeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNzI1MzIsImV4cCI6MjA1MjY1MjUzMn0.55m_y6_86_99_88_77_66_55_44_33_22_11';

const supabase = createClient(supabaseUrl, realSupabaseKey);

// 1. Check Local
const localDataPath = path.join(__dirname, 'src', 'data.js');
const localDataContent = fs.readFileSync(localDataPath, 'utf8');
const productsMatch = localDataContent.match(/export const INITIAL_PRODUCTS = (\[[\s\S]*?\]);/);
let localProducts = [];
if (productsMatch) {
    try {
        localProducts = JSON.parse(productsMatch[1]);
    } catch (e) {
        console.error("Locla JSON parse error", e);
    }
}

console.log("--- LOCAL PRODUCTS (src/data.js) ---");
localProducts.forEach(p => console.log(`[${p.id}] ${p.name}`));
if (localProducts.find(p => p.name.includes("Ceiling Profile"))) {
    console.log("!!! ALERT: Ceiling Profile FOUND in LOCAL !!!");
} else {
    console.log(">>> Ceiling Profile NOT found in LOCAL.");
}

// 2. Check Supabase
async function checkSupabase() {
    console.log("\n--- SUPABASE PRODUCTS ---");
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
        console.error("Supabase error:", error);
        return;
    }
    data.forEach(p => console.log(`[${p.id}] ${p.name}`));
    if (data.find(p => p.name.includes("Ceiling Profile"))) {
        console.log("!!! ALERT: Ceiling Profile FOUND in SUPABASE !!!");
    } else {
        console.log(">>> Ceiling Profile NOT found in SUPABASE.");
    }
}

checkSupabase();
