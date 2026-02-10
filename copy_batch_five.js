
import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:/Users/LENOVO/.gemini/antigravity/brain/5242715c-1e84-440a-a730-2ab025a32b6a';
const publicDir = 'c:/Users/LENOVO/.gemini/antigravity/playground/dynamic-tyson/public/images';

const map = {
    'uploaded_image_0_1767367895240.jpg': 'fluted_panel_wood.jpg',
    'uploaded_image_1_1767367895240.jpg': 'mesh_tape.jpg',
    'uploaded_image_2_1767367895240.jpg': 'floor_tile.jpg',
    'uploaded_image_3_1767367895240.jpg': 'corner_bead_metal.jpg',
    'uploaded_image_4_1767367895240.jpg': 'sisla_fiber_stone.jpg'
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
