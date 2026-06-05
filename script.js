const button = document.getElementById('checkButton');
const buttonLabel = button.querySelector('.button-label');
const result = document.getElementById('result');

const timeZones = [
  { label: 'New York', zone: 'America/New_York' },
  { label: 'London', zone: 'Europe/London' },
  { label: 'Paris', zone: 'Europe/Paris' },
  { label: 'Tokyo', zone: 'Asia/Tokyo' },
  { label: 'Sydney', zone: 'Australia/Sydney' },
  { label: 'São Paulo', zone: 'America/Sao_Paulo' },
  { label: 'Los Angeles', zone: 'America/Los_Angeles' },
  { label: 'Dubai', zone: 'Asia/Dubai' },
  { label: 'Mumbai', zone: 'Asia/Kolkata' },
  { label: 'Mexico City', zone: 'America/Mexico_City' },
  { label: 'Berlin', zone: 'Europe/Berlin' },
  { label: 'Seoul', zone: 'Asia/Seoul' },
  { label: 'Honolulu', zone: 'Pacific/Honolulu' },
  { label: 'Auckland', zone: 'Pacific/Auckland' },
  { label: 'Johannesburg', zone: 'Africa/Johannesburg' }
];

function getZoneTime(zone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const parts = formatter.formatToParts(new Date());
  const time = parts
    .filter(part => part.type === 'hour' || part.type === 'minute' || part.type === 'second')
    .map(part => part.value)
    .join(':');
  return time;
}

function getLocalHours() {
  const now = new Date();
  return now.getHours();
}

function chooseRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function setLoading(isLoading) {
  button.classList.toggle('loading', isLoading);
  button.disabled = isLoading;
  result.classList.toggle('loading', isLoading);
  buttonLabel.textContent = isLoading ? 'Looking... 🌍' : 'Check Now';

  if (isLoading) {
    result.innerHTML = '<p>Searching the world for 5 PM... ✨</p>';
  }
}

function renderResult(isFiveOrLater, location) {
  if (isFiveOrLater) {
    result.innerHTML = `<p>it's 5 pm or later!</p>`;
    return;
  }

  if (!location) {
    result.innerHTML = `<p>it's 5 pm or later somewhere!</p>`;
    return;
  }

  result.innerHTML = `<p>it's 5 pm or later in ${location.label}!</p>`;
}

function checkTime() {
  setLoading(true);

  setTimeout(() => {
    const localHours = getLocalHours();
    const userIsFiveOrLater = localHours >= 17;

    if (userIsFiveOrLater) {
      renderResult(true);
      setLoading(false);
      return;
    }

    const allZones = timeZones.map(zone => ({
      ...zone,
      time: getZoneTime(zone.zone),
      hour: Number(getZoneTime(zone.zone).split(':')[0])
    }));

    // First, look for locations where it's exactly 5 PM (hour 17)
    let candidates = allZones.filter(zone => zone.hour === 17);

    // If none found, broaden to 5 PM or later
    if (candidates.length === 0) {
      candidates = allZones.filter(zone => zone.hour >= 17);
    }

    const picked = candidates.length > 0 ? chooseRandom(candidates) : null;
    renderResult(false, picked);
    setLoading(false);
  }, 950);
}

button.addEventListener('click', checkTime);

// Report bug button
const reportBugButton = document.getElementById('reportBugButton');
const bugModal = document.getElementById('bugModal');

reportBugButton.addEventListener('click', () => {
  bugModal.classList.add('active');
  bugModal.setAttribute('aria-hidden', 'false');
});

bugModal.addEventListener('click', (e) => {
  if (e.target === bugModal) {
    bugModal.classList.remove('active');
    bugModal.setAttribute('aria-hidden', 'true');
  }
});
