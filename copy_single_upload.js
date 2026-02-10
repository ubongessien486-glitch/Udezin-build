
import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:/Users/LENOVO/.gemini/antigravity/brain/5242715c-1e84-440a-a730-2ab025a32b6a';
const publicDir = 'c:/Users/LENOVO/.gemini/antigravity/playground/dynamic-tyson/public/images';

// Guessing this is the "Door" based on the order of the user's list
const map = {
    'uploaded_image_1767351941513.png': 'product_door.jpg'
};

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

Object.entries(map).forEach(([src, dest]) => {
    const sourcePath = path.join(artifactsDir, src);
    const destPath = path.join(publicDir, dest);
    try {
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied ${src} to ${dest}`);
        } else {
            console.log(`Source missing: ${src}`);
        }
    } catch (e) {
        console.error(`Error copying ${src}: ${e.message}`);
    }
});
