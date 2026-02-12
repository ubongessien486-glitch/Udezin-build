
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Setup Supabase
const supabaseUrl = 'https://qakkayfzwkfggidyjxhf.supabase.co';
// Reading key from src/supabase.js to be safe (same logic as sync_data.cjs)
const supabaseConfigPath = path.join(__dirname, 'src', 'supabase.js');
let realSupabaseKey = '';
try {
    const supabaseConfig = fs.readFileSync(supabaseConfigPath, 'utf8');
    const match = supabaseConfig.match(/supabaseKey\s*=\s*['"]([^'"]+)['"]/);
    if (match) {
        realSupabaseKey = match[1];
    }
} catch (e) {
    console.warn("Could not read src/supabase.js, trying fallback.");
}

const supabaseKey = realSupabaseKey || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFha2theWZ6d2tmZ2dpZHlqeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNzI1MzIsImV4cCI6MjA1MjY1MjUzMn0.55m_y6_86_99_88_77_66_55_44_33_22_11';

if (!supabaseKey) {
    console.error("Supabase key not found!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function pullData() {
    console.log("Pulling data FROM Supabase...");

    // Fetch Products
    const { data: products, error: prodError } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

    if (prodError) {
        console.error("Error fetching products:", prodError);
        return;
    }

    // Fetch Projects (if any) - Optional but good for full sync
    // const { data: projects, error: projError } = await supabase.from('projects').select('*'); 

    // Formatting as JS module content
    const fileContent = `
export const INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};

export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Luxury Villa",
    location: "Lekki Phase 1",
    image: "https://images.unsplash.com/photo-1613490493576-2f5033197976?auto=format&fit=crop&q=80&w=1000",
    status: "Completed",
    category: "Residential"
  },
  {
    id: 2,
    title: "Modern Office Complex",
    location: "Victoria Island",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
    status: "In Progress",
    category: "Commercial"
  },
  {
    id: 3,
    title: "Penthouse Apartment",
    location: "Ikoyi",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    status: "Completed",
    category: "Residential"
  }
];
`;

    const localDataPath = path.join(__dirname, 'src', 'data.js');
    fs.writeFileSync(localDataPath, fileContent);
    console.log(`Successfully pulled ${products.length} products from Supabase to src/data.js`);
}

pullData();
