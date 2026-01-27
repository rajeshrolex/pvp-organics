
import https from 'https';

const url = 'https://loremflickr.com/600/400/castor,oil';

https.get(url, (res) => {
    console.log('Status:', res.statusCode);
    if (res.statusCode === 301 || res.statusCode === 302) {
        console.log('Redirects to:', res.headers.location);
    }
}).on('error', (e) => {
    console.error(e);
});
