import crypto from 'crypto';
import fs from 'fs';

const files = [
    'Pumpkin_seeds.jpg',
    'Sunflower_seeds.jpg',
    'Brown_Flax_Seeds.jpg',
    'Chia_seeds_-_Salvia_hispanica.jpg'
];

let content = '';
files.forEach(f => {
    const cleanName = f.replace(/ /g, '_');
    const hash = crypto.createHash('md5').update(cleanName).digest('hex');
    const part1 = hash.substring(0, 1);
    const part2 = hash.substring(0, 2);
    content += `${f}:::https://upload.wikimedia.org/wikipedia/commons/${part1}/${part2}/${cleanName}\n`;
});

fs.writeFileSync('urls.txt', content);
console.log('Written to urls.txt');
