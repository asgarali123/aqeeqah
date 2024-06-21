document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit-btn').addEventListener('click', showResult);
    document.getElementById('ok-btn').addEventListener('click', closePopup);
    document.getElementById('sunnah-btn').addEventListener('click', () => window.location.href = 'sun.html');
    document.getElementById('fatwa-btn').addEventListener('click', () => window.location.href = 'fat.html');
});

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

function closePopup() {
    document.getElementById('result-popup').style.display = 'none';
}

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

function getDayOfWeek(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:  return 'st';
        case 2:  return 'nd';
        case 3:  return 'rd';
        default: return 'th';
    }
}
