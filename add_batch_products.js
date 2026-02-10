
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Supabase setup
const supabaseUrl = 'https://qakkayfzwkfggidyjxhf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFha2theWZ6d2tmZ2dpZHlqeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NzEyMzEsImV4cCI6MjA4MzQ0NzIzMX0.swHHIqyDPmWTJ-FFrR4m3QfWf6__5f4zcQflYMsom5c';
const supabase = createClient(supabaseUrl, supabaseKey);

const productsToAdd = [
    {
        name: "Pop white cement",
        price: 500,
        category: "Interior",
        stock: "In Stock",
        imagePath: 'C:/Users/LENOVO/.gemini/antigravity/brain/c3b8234d-81cb-4b0e-823d-61ca215153ee/uploaded_media_1770409540176.png'
    },
    {
        name: "Floor tile skirting",
        price: 5500,
        category: "Interior",
        stock: "In Stock",
        imagePath: 'C:/Users/LENOVO/.gemini/antigravity/brain/c3b8234d-81cb-4b0e-823d-61ca215153ee/uploaded_media_1770409630627.png'
    }
];

async function addBatch() {
    console.log("Starting batch upload of 2 items...");

    for (const item of productsToAdd) {
        try {
            console.log(`Processing: ${item.name}`);
            const imageBuffer = fs.readFileSync(item.imagePath);
            const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

            const newProduct = {
                id: Date.now() + Math.floor(Math.random() * 1000), // Ensure unique IDs
                name: item.name,
                category: item.category,
                price: item.price,
                stock: item.stock,
                image: base64Image
            };

            const { error } = await supabase
                .from('products')
                .insert([newProduct]);

            if (error) {
                console.error(`Failed to upload ${item.name}:`, error.message);
            } else {
                console.log(`Successfully added: ${item.name}`);
            }

        } catch (err) {
            console.error(`Error processing ${item.name}:`, err.message);
        }
    }
    console.log("Batch upload complete.");
}

addBatch();
