require('dotenv').config();
const { LingoDotDevEngine } = require('lingo.dev/sdk');
const en = require('./src/locales/en.json');
const fs = require('fs');

const lingoDotDev = new LingoDotDevEngine({
  apiKey: process.env.VITE_LINGO_DEV_API_KEY,
});

(async () => {
  const fr = {};
  for (const key in en) {
    const [translated] = await lingoDotDev.batchLocalizeText(en[key], {
      sourceLocale: 'en',
      targetLocales: ['fr'],
    });
    fr[key] = translated;
    console.log(`Translated [${key}]: ${en[key]} -> ${fr[key]}`);
  }
  fs.writeFileSync('./src/locales/fr.json', JSON.stringify(fr, null, 2));
  console.log('French translations written to ./src/locales/fr.json');
})();
