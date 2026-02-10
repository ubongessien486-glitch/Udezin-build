
import { supabase } from './src/supabase.js';
import { INITIAL_PRODUCTS, INITIAL_PROJECTS } from './src/data.js';

async function seedData() {
    console.log('Seeding Products...');

    // Clean up existing data to avoid duplicates if re-run (optional, but good for idempotency)
    // await supabase.from('products').delete().neq('id', 0); 

    const { error: productError } = await supabase
        .from('products')
        .upsert(INITIAL_PRODUCTS);

    if (productError) {
        console.error('Error seeding products:', productError);
    } else {
        console.log('Products seeded successfully!');
    }

    console.log('Seeding Projects...');
    const { error: projectError } = await supabase
        .from('projects')
        .upsert(INITIAL_PROJECTS);

    if (projectError) {
        console.error('Error seeding projects:', projectError);
    } else {
        console.log('Projects seeded successfully!');
    }
}

seedData();
