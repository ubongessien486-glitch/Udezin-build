
import { INITIAL_PRODUCTS } from './src/data.js';

const base64Products = INITIAL_PRODUCTS.filter(p => p.image && p.image.startsWith('data:image'));

console.log("Products with Base64 images:");
base64Products.forEach(p => {
    console.log(`- ID: ${p.id}, Name: "${p.name}"`);
});
