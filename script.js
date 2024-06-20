document.getElementById('submit-btn').addEventListener('click', showResult);

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

    document.querySelector('.close').onclick = function() {
        popup.style.display = 'none';
    };
}

function formatDate(date) {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getDayOfWeek(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}
