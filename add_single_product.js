
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Supabase setup
const supabaseUrl = 'https://qakkayfzwkfggidyjxhf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFha2theWZ6d2tmZ2dpZHlqeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NzEyMzEsImV4cCI6MjA4MzQ0NzIzMX0.swHHIqyDPmWTJ-FFrR4m3QfWf6__5f4zcQflYMsom5c';
const supabase = createClient(supabaseUrl, supabaseKey);

// Image Path (from user upload)
const imagePath = 'C:/Users/LENOVO/.gemini/antigravity/brain/c3b8234d-81cb-4b0e-823d-61ca215153ee/uploaded_media_1770409495342.png';

async function addProduct() {
    try {
        console.log("Reading image...");
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

        const newProduct = {
            id: Date.now(),
            name: "3D wall panel",
            category: "Wall Decor", // Guessing category based on name
            price: 11500,
            stock: "In Stock",
            image: base64Image
        };

        console.log("Uploading to Supabase...");
        const { data, error } = await supabase
            .from('products')
            .insert([newProduct])
            .select();

        if (error) {
            console.error("Error inserting product:", error);
        } else {
            console.log("Success! Product added:", data);
        }

    } catch (err) {
        console.error("Script failed:", err);
    }
}

addProduct();
