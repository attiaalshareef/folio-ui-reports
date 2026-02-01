const fs = require('fs');

const rawdata = fs.readFileSync('./translations/ui-reports/en.json');
const arData = fs.readFileSync('./translations/ui-reports/ar.json');

const parsedRawdata = JSON.parse(rawdata);
const parsedArabicData = JSON.parse(arData);

const diff = {};
const keys = Object.keys(parsedRawdata);
keys.forEach(element => {
  for (const key in parsedArabicData) {
    if (element === key) {
      diff[key] = parsedArabicData[key];
    }
  }
});

// fs.writeFileSync(
//   './translations/ui-reports/diff/ar-diff.json',
//   JSON.stringify(diff)
// );

const updatedArabicKeys = Object.assign(parsedRawdata, diff);

fs.writeFileSync(
  './translations/ui-reports/ar.json',
  JSON.stringify(updatedArabicKeys, null, ' ')
);
