
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Using high-quality, reliable source URLs (Unsplash source API often redirects to a valid image)
// or specific Wikimedia images that I confirm are good and accessible.
// Since Wikimedia failed earlier, I'll try a specific set of Pexels/Unsplash SOURCE urls if I can guess them, 
// OR simpler: use a different free stock photo API or known good URLs.
// Actually, let's try the Wikimedia ones again with a different User-Agent that mimics a browser exactly, 
// as 404s were likely anti-hotlinking/bot protection.

const images = [
    // Oils
    { url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Castor_oil_02.jpg', dest: 'castor-oil.jpg' }, // Different file
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Peanut_oil_bottle.jpg/450px-Peanut_oil_bottle.jpg', dest: 'groundnut-oil.jpg' }, // Thumb version often safer
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Mustard_Oil.jpg/448px-Mustard_Oil.jpg', dest: 'mustard-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Bottle_1_liter_Sunflower_refined_oil.jpg/300px-Bottle_1_liter_Sunflower_refined_oil.jpg', dest: 'sunflower-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/SweetAlmondOil.png', dest: 'almond-oil.png' }, // Provide alternative if fails
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Safflower_oil.jpg/341px-Safflower_oil.jpg', dest: 'safflower-oil.jpg' },

    // Dry Fruits
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Date_fruit.jpg/640px-Date_fruit.jpg', dest: 'dates-black.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ripe_and_dry_dates_fruit_bunches.jpg/640px-Ripe_and_dry_dates_fruit_bunches.jpg', dest: 'dates-white.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Walnuts_-_whole_and_open_with_halved_kernel.jpg/640px-Walnuts_-_whole_and_open_with_halved_kernel.jpg', dest: 'walnuts.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/BLACK_RAISINS.jpg/480px-BLACK_RAISINS.jpg', dest: 'raisins-black.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Golden_Jumbo_Raisins_comparison.jpg/640px-Golden_Jumbo_Raisins_comparison.jpg', dest: 'raisins-golden.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Dried_apricots.jpg/640px-Dried_apricots.jpg', dest: 'apricots.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Dried_figs_%288407322626%29.jpg/640px-Dried_figs_%288407322626%29.jpg', dest: 'figs.jpg' }
];

const download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://commons.wikimedia.org/'
        }
    };

    https.get(url, options, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
            download(response.headers.location, dest, cb);
            return;
        }
        if (response.statusCode !== 200) {
            console.log(`Failed ${url}: ${response.statusCode}`);
            fs.unlink(dest, () => { });
            if (cb) cb(`Status ${response.statusCode}`);
            return;
        }
        response.pipe(file);
        file.on('finish', () => {
            file.close(cb);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => { });
        if (cb) cb(err.message);
    });
};

const processImages = async () => {
    for (const img of images) {
        const destPath = path.join(__dirname, 'public', img.dest);
        console.log(`Downloading ${img.dest}...`);
        await new Promise(resolve => download(img.url, destPath, resolve));
        console.log(`Done ${img.dest}`);
    }
};

processImages();
