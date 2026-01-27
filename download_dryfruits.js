import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// High-quality Unsplash image URLs (using direct download links for free images)
const images = [
    {
        url: 'https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=1200&q=80',
        name: 'almonds.jpg',
        description: 'Premium almonds'
    },
    {
        url: 'https://images.unsplash.com/photo-1585326352735-174997e0e018?w=1200&q=80',
        name: 'cashews.jpg',
        description: 'Premium cashew nuts'
    },
    {
        url: 'https://images.unsplash.com/photo-1610462275440-c1d8a77073d9?w=1200&q=80',
        name: 'dates-black.jpg',
        description: 'Black dates'
    },
    {
        url: 'https://images.unsplash.com/photo-1610462272741-9e94a36e1c2e?w=1200&q=80',
        name: 'dates-white.jpg',
        description: 'White/golden dates'
    },
    {
        url: 'https://images.unsplash.com/photo-1522226645416-57e4f2b9f41e?w=1200&q=80',
        name: 'walnuts.jpg',
        description: 'Premium walnuts'
    },
    {
        url: 'https://images.unsplash.com/photo-1588953941924-cd0cc01bb890?w=1200&q=80',
        name: 'raisins-black.jpg',
        description: 'Black raisins'
    },
    {
        url: 'https://images.unsplash.com/photo-1578319409872-2b8c98c3f0ca?w=1200&q=80',
        name: 'raisins-golden.jpg',
        description: 'Golden raisins'
    },
    {
        url: 'https://images.unsplash.com/photo-1627080387995-2d4d82b23326?w=1200&q=80',
        name: 'apricots.jpg',
        description: 'Dry apricots'
    },
    {
        url: 'https://images.unsplash.com/photo-1604591132293-40b3e6a54e29?w=1200&q=80',
        name: 'figs.jpg',
        description: 'Dry figs'
    }
];

const downloadImage = (url, filepath, description) => {
    return new Promise((resolve, reject) => {
        console.log(`Downloading ${description}...`);

        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Handle redirect
                return https.get(response.headers.location, (redirectResponse) => {
                    const file = fs.createWriteStream(filepath);
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`✅ Downloaded: ${description}`);
                        resolve();
                    });
                }).on('error', reject);
            }

            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${description}: ${response.statusCode}`));
                return;
            }

            const file = fs.createWriteStream(filepath);
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`✅ Downloaded: ${description}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

async function downloadAll() {
    const publicDir = path.join(__dirname, 'public');

    console.log('Starting download of dry fruits images...\n');

    for (const image of images) {
        const filepath = path.join(publicDir, image.name);
        try {
            await downloadImage(image.url, filepath, image.description);
            // Add delay to be respectful to Unsplash
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`❌ Error downloading ${image.description}:`, error.message);
        }
    }

    console.log('\n✅ All downloads completed!');
}

downloadAll().catch(console.error);
