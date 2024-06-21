// Event listener setup on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit-btn').addEventListener('click', showResult);
    document.getElementById('ok-btn').addEventListener('click', closePopup);
    document.getElementById('sunnah-btn').addEventListener('click', () => window.location.href = 'sun.html');
    document.getElementById('fatwa-btn').addEventListener('click', () => window.location.href = 'fat.html');

    // Register service worker for caching and updates
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }

    // Check for updates and force reload if necessary
    fetch('/version.json')
        .then(response => response.json())
        .then(serverVersion => {
            const currentVersion = localStorage.getItem('appVersion');
            if (currentVersion !== serverVersion.version) {
                localStorage.setItem('appVersion', serverVersion.version);
                window.location.reload(true); // Force reload to fetch the latest version
            }
        });
});

// Function to show results in a popup
function showResult() {
    const dobInput = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const beforeSunset = document.getElementById('sunset').value === 'yes';

    if (!dobInput) {
        alert('Please select a valid date');
        return;
    }

    const dobDate = new Date(dobInput);

    let dueDate = new Date(dobDate);
    if (beforeSunset) {
        dueDate.setDate(dueDate.getDate() + 6);
    } else {
        dueDate.setDate(dueDate.getDate() + 7);
    }

    const dueDateStr = formatDate(dueDate);
    const dayOfWeek = getDayOfWeek(dueDate);

    const sacrifice = (gender === 'boy') ? 'You have to sacrifice 2 sheep or goats' : 'You have to sacrifice 1 sheep or goat';

    const resultText = `Masha Allah! \nMay Allah bless your baby ${gender}. \n${sacrifice}. \nThe day of the aqeeqah will be on ${dayOfWeek}, ${dueDateStr}`;
    document.getElementById('result-text').innerText = resultText;

    const popup = document.getElementById('result-popup');
    popup.style.display = 'block';

    window.onclick = function(event) {
        if (event.target == popup) {
            closePopup();
        }
    };
}

// Function to close the popup
function closePopup() {
    document.getElementById('result-popup').style.display = 'none';
}

// Function to format the date into a readable string
function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    const dayWithSuffix = day + getDaySuffix(day);
    return `${dayWithSuffix} ${monthNames[month]} ${year}`;
}

// Function to get the day of the week
function getDayOfWeek(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

// Function to get the suffix for the day of the month
function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th'; // catch 11th to 20th
    switch (day % 10) {
        case 1:  return 'st';
        case 2:  return 'nd';
        case 3:  return 'rd';
        default: return 'th';
    }
}
