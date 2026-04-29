import https from 'https';

https.get('https://raw.githubusercontent.com/Dedepya/AGRI-GAIN/master/index.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data.substring(0, 2000));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
