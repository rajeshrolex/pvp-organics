
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Wikimedia images that are more likely to be stable/correct
// Using decodeURIComponent to ensure filename is correct if copied from URL bar
const images = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Bottle,_castor_oil_(AM_1969.210-5).jpg', dest: 'castor-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Peanut_oil_bottle.jpg', dest: 'groundnut-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Mustard_Oil.jpg', dest: 'mustard-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Bottle_1_liter_Sunflower_refined_oil.jpg', dest: 'sunflower-oil.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/SweetAlmondOil.png', dest: 'almond-oil.png' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Safflower_oil.jpg', dest: 'safflower-oil.jpg' },

    // Dry Fruits (Using very specific file URLs from earlier search)
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Almonds_and_nnuts.JPG', dest: 'almonds.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Young_cashew_nuts.jpg', dest: 'cashews.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Date_fruit.jpg', dest: 'dates-black.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Ripe_and_dry_dates_fruit_bunches.jpg', dest: 'dates-white.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Walnuts_-_whole_and_open_with_halved_kernel.jpg', dest: 'walnuts.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/BLACK_RAISINS.jpg', dest: 'raisins-black.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Golden_Jumbo_Raisins_comparison.jpg', dest: 'raisins-golden.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Dried_apricots.jpg', dest: 'apricots.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Dried_figs_(8407322626).jpg', dest: 'figs.jpg' }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        // Ensure URL is encoded correctly for special chars if needed, 
        // but https.get usually handles normal strings. 
        // For wikimedia, it's safer to use the exact string if it has encoded chars, 
        // OR encoded if it has spaces/parens. 
        // Let's rely on the string being correct URL format.

        const options = {
            headers: {
                'User-Agent': 'Bot/1.0 (Researching/Test script used for retrieval)', // Polite UA
            }
        };

        https.get(url, options, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // handle redirect manually if needed, or simple recursion
                // But for now let's hope direct links work or fail fast
                console.log(`Redirect for ${dest}`);
                resolve(false);
                return;
            }
            if (response.statusCode !== 200) {
                console.log(`Failed ${dest}: ${response.statusCode}`);
                fs.unlink(dest, () => { });
                resolve(false);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${dest}`);
                resolve(true);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            console.error(`Error ${dest}: ${err.message}`);
            resolve(false);
        });
    });
};

const run = async () => {
    for (const img of images) {
        // Construct full URL with encoding for path parts if deemed necessary, 
        // but here we trust the provided URL string.
        // We will replace parens if they cause issues, but https module usually ok.
        const encodedUrl = encodeURI(img.url).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%2528/g, '%28').replace(/%2529/g, '%29');
        // Just attempting basic encoding fix if searched url was cleaner.

        // Actually, let's just use the raw URL string first, encodedURI handles spaces.
        const targetUrl = new URL(img.url).href;

        await download(targetUrl, path.join(__dirname, 'public', img.dest));
        await sleep(5000); // 5 second delay to be nice
    }
};

run();
