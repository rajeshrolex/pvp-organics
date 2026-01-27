import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Pumpkin_seeds.jpg',
        name: 'Pumpkin Seeds.jpg',
        description: 'Pumpkin Seeds'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Sunflower_seeds.jpg',
        name: 'Sunflower Seeds.jpg',
        description: 'Sunflower Seeds'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Brown_Flax_Seeds.jpg',
        name: 'Flax Seeds.jpg',
        description: 'Flax Seeds'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Chia_seeds.jpg',
        name: 'Chia Seeds.jpg',
        description: 'Chia Seeds'
    }
];

const downloadImage = (url, filepath, description) => {
    return new Promise((resolve, reject) => {
        console.log(`Downloading ${description}...`);

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(url, options, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return https.get(response.headers.location, options, (redirectResponse) => {
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
    const publicDir = path.join(__dirname, 'public', 'Seeds');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    console.log('🌟 Starting download of seed images...\n');

    for (const image of images) {
        const filepath = path.join(publicDir, image.name);
        try {
            await downloadImage(image.url, filepath, image.description);
        } catch (error) {
            console.error(`❌ Error downloading ${image.description}:`, error.message);
        }
    }
}

downloadAll().catch(console.error);
