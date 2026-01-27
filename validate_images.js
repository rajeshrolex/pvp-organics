
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const imagesToCheck = [
    'castor-oil.jpg', 'groundnut-oil.jpg', 'mustard-oil.jpg', 'sunflower-oil.jpg', 'almond-oil.png', 'safflower-oil.jpg',
    'almonds-new.jpg', 'cashews-new.jpg', 'dates-white.jpg', 'figs.jpg', 'walnuts.jpg', 'raisins-black.jpg', 'raisins-golden.jpg', 'apricots.jpg'
];

const validImages = [];

imagesToCheck.forEach(file => {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.size > 0) {
            console.log(`Valid: ${file} (${stats.size} bytes)`);
            validImages.push(file);
        } else {
            console.log(`Invalid (0 bytes): ${file}`);
            try { fs.unlinkSync(filePath); } catch (e) { }
        }
    } else {
        console.log(`Missing: ${file}`);
    }
});
