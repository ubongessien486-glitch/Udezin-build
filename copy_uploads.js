
import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:/Users/LENOVO/.gemini/antigravity/brain/5242715c-1e84-440a-a730-2ab025a32b6a';
const publicDir = 'c:/Users/LENOVO/.gemini/antigravity/playground/dynamic-tyson/public/images';

const map = {
    'uploaded_image_0_1767271303285.jpg': 'stud_track.jpg',
    'uploaded_image_1_1767271303285.jpg': 'self_drilling_screw.jpg',
    'uploaded_image_2_1767271303285.jpg': 'golden_screw.jpg',
    'uploaded_image_3_1767271303285.jpg': 'loading_gypsum.jpg', // Used for PH Project AND Product
    'uploaded_image_4_1767271303285.jpg': 'joint_tape_new.jpg'
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
