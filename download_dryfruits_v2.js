import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Using Pixabay CDN and other free sources with reliable URLs
const images = [
    {
        url: 'https://cdn.pixabay.com/photo/2016/02/29/05/46/almonds-1226962_1280.jpg',
        name: 'almonds.jpg',
        description: 'Premium almonds'
    },
    {
        url: 'https://cdn.pixabay.com/photo/2016/07/07/16/46/cashews-1502552_1280.jpg',
        name: 'cashews.jpg',
        description: 'Premium cashew nuts'
    },
    {
        url: 'https://cdn.pixabay.com/photo/2015/05/28/23/12/干果-788838_1280.jpg',
        name: 'dates-black.jpg',
        description: 'Black dates'
    },
    {
        url: 'https://cdn.pixabay.com/photo/2017/06/21/08/46/dates-2426722_1280.jpg',
        name: 'dates-white.jpg',
        description: 'White/golden dates'
    },
    {
        url: 'https://cdn.pixabay.com/photo/2016/07/26/16/32/walnuts-1543315_1280.jpg',
        name: 'walnuts.jpg',
        description: 'Premium walnuts'
    },
    {
        url: 'https://cdn.pixabay.com/photo/2016/04/15/08/04/raisins-1330766_1280.jpg',
        name: 'raisins-black.jpg',
        description: 'Black raisins'
    },
    {
        url: 'https://cdn.pixabay.com/photo/2017/09/26/13/31/raisins-2789665_1280.jpg',
        name: 'raisins-golden.jpg',
        description: 'Golden raisins'
    },
    {
        url: 'https://cdn.pixabay.com/photo/2016/10/25/13/16/apricots-1768916_1280.jpg',
        name: 'apricots.jpg',
        description: 'Dry apricots'
    },
    {
        url: 'https://cdn.pixabay.com/photo/2016/07/10/20/49/figs-1508869_1280.jpg',
        name: 'figs.jpg',
        description: 'Dry figs'
    }
];

const downloadImage = (url, filepath, description) => {
    return new Promise((resolve, reject) => {
        console.log(`Downloading ${description}...`);

        https.get(url, (response) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                return https.get(response.headers.location, (redirectResponse) => {
                    if (redirectResponse.statusCode !== 200) {
                        reject(new Error(`Failed after redirect: ${redirectResponse.statusCode}`));
                        return;
                    }

                    const file = fs.createWriteStream(filepath);
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`✅ Downloaded: ${description}`);
                        resolve();
                    });
                    file.on('error', reject);
                }).on('error', reject);
            }

            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }

            const file = fs.createWriteStream(filepath);
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`✅ Downloaded: ${description}`);
                resolve();
            });

            file.on('error', (err) => {
                fs.unlink(filepath, () => { });
                reject(err);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

async function downloadAll() {
    const publicDir = path.join(__dirname, 'public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    console.log('Starting download of dry fruits images from Pixabay...\n');

    let successCount = 0;
    let failCount = 0;

    for (const image of images) {
        const filepath = path.join(publicDir, image.name);
        try {
            await downloadImage(image.url, filepath, image.description);
            successCount++;
            // Add delay to be respectful
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`❌ Error downloading ${image.description}:`, error.message);
            failCount++;
        }
    }

    console.log(`\n📊 Download Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📁 Total: ${images.length}`);
}

downloadAll().catch(console.error);
