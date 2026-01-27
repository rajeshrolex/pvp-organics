
import fs from 'fs';
import https from 'https';

const url = 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Bottle,_castor_oil_(AM_1969.210-5).jpg';
const dest = 'public/castor-test.jpg';

const file = fs.createWriteStream(dest);
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
    console.log('Status:', response.statusCode);
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Done');
    });
});
