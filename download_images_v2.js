
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
    // Oils
    { url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Bottle%2C_castor_oil_%28AM_1969.210-5%29.jpg', dest: 'castor-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Peanut_oil_bottle.jpg', dest: 'groundnut-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Mustard_Oil.jpg', dest: 'mustard-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Bottle_1_liter_Sunflower_refined_oil.jpg', dest: 'sunflower-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/SweetAlmondOil.png', dest: 'almond-oil.png' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Safflower_oil.jpg', dest: 'safflower-oil.jpg' },

    // Dry Fruits
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Almonds_and_nnuts.JPG', dest: 'almonds-new.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Young_cashew_nuts.jpg', dest: 'cashews-new.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Date_fruit.jpg', dest: 'dates-black.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Ripe_and_dry_dates_fruit_bunches.jpg', dest: 'dates-white.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Walnuts_-_whole_and_open_with_halved_kernel.jpg', dest: 'walnuts.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/BLACK_RAISINS.jpg', dest: 'raisins-black.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Golden_Jumbo_Raisins_comparison.jpg', dest: 'raisins-golden.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Dried_apricots.jpg', dest: 'apricots.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Dried_figs_%288407322626%29.jpg', dest: 'figs.jpg' },
];

const download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
            download(response.headers.location, dest, cb);
            return;
        }
        response.pipe(file);
        file.on('finish', () => {
            file.close(cb); // close() is async, call cb after close completes.
        });
    }).on('error', (err) => { // Handle errors
        fs.unlink(dest, () => { }); // Delete the file async. (But we don't check result)
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
