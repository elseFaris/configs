const { writeFileSync } = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'hijri-date.txt');

const hijriFormatter = new Intl.DateTimeFormat('ar-SA', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Riyadh',
});
const monthNameFormatter = new Intl.DateTimeFormat('ar-SA', { month: 'long' });

function getHijriDate(currentDate) {
    const parts = hijriFormatter.formatToParts(currentDate);
    const day = parts.find((part) => part.type === 'day').value;
    const month = parts.find((part) => part.type === 'month').value;
    const year = parts.find((part) => part.type === 'year').value;
    const monthName = monthNameFormatter.format(currentDate, { month: 'long' });
    const hijriDateWithMonthName = `${day}/${monthName} (${month})/${year}`;
    return hijriDateWithMonthName;
}

function updateHijriDateFile() {
    const currentDate = new Date();
    const hijriDate = getHijriDate(currentDate);
    writeFileSync(filePath, hijriDate);
}

updateHijriDateFile();
setInterval(updateHijriDateFile, 10000); // Update every 10 seconds
