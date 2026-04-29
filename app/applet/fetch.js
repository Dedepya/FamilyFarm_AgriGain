import https from 'https';
import fs from 'fs';

https.get('https://dedepya.github.io/AGRI-GAIN/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('agri-gain.html', data);
    console.log('Downloaded');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
