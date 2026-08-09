const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let totalSeconds = 24 * 60 * 60;

function updateTimer() {
    if (totalSeconds <= 0) {
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        return;
    }

    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursElement.textContent = String(h).padStart(2, '0');
    minutesElement.textContent = String(m).padStart(2, '0');
    secondsElement.textContent = String(s).padStart(2, '0');
}

setInterval(updateTimer, 1000);
