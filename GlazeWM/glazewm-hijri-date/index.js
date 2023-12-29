const { writeFileSync, write } = require('fs');
const { dirname } = require('path');

const rootDir = dirname(__dirname);

function updateHijriDate() {
    const currentDate = new Date();
    const hijriFormatter = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
    const hijriDate = hijriFormatter.format(currentDate);
    const [month, day, year] = hijriDate.split('/');
    const formattedDate = `${day}/${month}/${year}`.replace(' AH', '');

    writeFileSync(`${rootDir}/glazewm-hijri-date/hijri-date.txt`, formattedDate);
}

updateHijriDate();
setInterval(updateHijriDate, 10000);
