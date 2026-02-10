
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qakkayfzwkfggidyjxhf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFha2theWZ6d2tmZ2dpZHlqeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NzEyMzEsImV4cCI6MjA4MzQ0NzIzMX0.swHHIqyDPmWTJ-FFrR4m3QfWf6__5f4zcQflYMsom5c';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAndCleanup() {
    console.log("Fetching all products...");

    const { data: products, error } = await supabase
        .from('products')
        .select('id, name, price, stock, category');

    if (error) {
        console.error("Error fetching products:", error.message);
        return;
    }

    console.log(`Total products listed in DB: ${products.length}`);

    // Map to track duplicates
    const nameMap = new Map();
    const idsToDelete = [];

    products.forEach(p => {
        // Normalize name for comparison
        const normalizedName = p.name.trim().toLowerCase();

        if (nameMap.has(normalizedName)) {
            // Duplicate found!
            console.log(`Duplicate found: "${p.name}" (ID: ${p.id}). Marking for deletion.`);
            idsToDelete.push(p.id);
        } else {
            nameMap.set(normalizedName, p);
        }
    });

    console.log("Unique Products found:", Array.from(nameMap.values()).map(p => p.name));

    if (idsToDelete.length > 0) {
        console.log(`Deleting ${idsToDelete.length} duplicates...`);
        const { error: deleteError } = await supabase
            .from('products')
            .delete()
            .in('id', idsToDelete);

        if (deleteError) {
            console.error("Error deleting duplicates:", deleteError.message);
        } else {
            console.log("Duplicates deleted successfully.");
        }
    } else {
        console.log("No duplicates found.");
    }
}

checkAndCleanup();
