import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Using Wikimedia Commons - these are guaranteed to be freely licensed
const images = [
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Amandes.jpg/1280px-Amandes.jpg',
        name: 'almonds.jpg',
        description: 'Premium almonds'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Cashews_in_China.jpg/1280px-Cashews_in_China.jpg',
        name: 'cashews.jpg',
        description: 'Premium cashew nuts'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Phoenix_dactylifera_fruit.jpg/1280px-Phoenix_dactylifera_fruit.jpg',
        name: 'dates-black.jpg',
        description: 'Black dates'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Date%2C_Fruit_of_Barhi_Cultivar%2C_Yellow_Khalal_Stage.jpg/1280px-Date%2C_Fruit_of_Barhi_Cultivar%2C_Yellow_Khalal_Stage.jpg',
        name: 'dates-white.jpg',
        description: 'White/golden dates'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Walnuts_-_whole_and_open_with_halved_kernel.jpg/1280px-Walnuts_-_whole_and_open_with_halved_kernel.jpg',
        name: 'walnuts.jpg',
        description: 'Premium walnuts'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/et/Dark_raisins.jpg/1280px-Dark_raisins.jpg',
        name: 'raisins-black.jpg',
        description: 'Black raisins'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Raisins.jpg/1280px-Raisins.jpg',
        name: 'raisins-golden.jpg',
        description: 'Golden raisins'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Dried_Apricots.jpg/1280px-Dried_Apricots.jpg',
        name: 'apricots.jpg',
        description: 'Dry apricots'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Dried_figs.jpg/1280px-Dried_figs.jpg',
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
                        const stats = fs.statSync(filepath);
                        console.log(`✅ Downloaded: ${description} (${(stats.size / 1024).toFixed(2)} KB)`);
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
                const stats = fs.statSync(filepath);
                console.log(`✅ Downloaded: ${description} (${(stats.size / 1024).toFixed(2)} KB)`);
                resolve();
            });

            file.on('error', (err) => {
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
                reject(err);
            });
        }).on('error', (err) => {
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
            reject(err);
        });
    });
};

async function downloadAll() {
    const publicDir = path.join(__dirname, 'public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    console.log('🌟 Starting download of dry fruits images from Wikimedia Commons...\n');

    let successCount = 0;
    let failCount = 0;

    for (const image of images) {
        const filepath = path.join(publicDir, image.name);
        try {
            await downloadImage(image.url, filepath, image.description);
            successCount++;
            // Brief delay
            await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
            console.error(`❌ Error downloading ${image.description}:`, error.message);
            failCount++;
        }
    }

    console.log(`\n📊 Download Summary:`);
    console.log(`   ✅ Success: ${successCount}/${images.length}`);
    console.log(`   ❌ Failed: ${failCount}/${images.length}`);

    if (successCount === images.length) {
        console.log(`\n🎉 All images downloaded successfully!`);
    } else if (successCount > 0) {
        console.log(`\n⚠️  Some images downloaded, but ${failCount} failed.`);
    } else {
        console.log(`\n❌ All downloads failed.`);
    }
}

downloadAll().catch(console.error);
