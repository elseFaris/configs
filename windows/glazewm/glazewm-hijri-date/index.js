const { writeFileSync, write } = require('fs');
const { dirname } = require('path');

const rootDir = dirname(__dirname);

function updateHijriDate() {
    const currentDate = new Date();

    const hijriFormatter = new Intl.DateTimeFormat('ar-SA', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }).formatToParts(currentDate);

    const day = hijriFormatter.find((part) => part.type === 'day').value;
    const month = hijriFormatter.find((part) => part.type === 'month').value;
    const year = hijriFormatter.find((part) => part.type === 'year').value;

    const monthName = new Intl.DateTimeFormat('ar-SA', { month: 'long' }).format(currentDate);
    const hijriDateWithMonthName = `${day}/${monthName} (${month})/${year}`;

    const filePath = `${rootDir}/glazewm-hijri-date/hijri-date.txt`;
    writeFileSync(filePath, hijriDateWithMonthName);
}

updateHijriDate();
setInterval(updateHijriDate, 10000); // Update every 10 seconds
