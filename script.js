const btnDaily = document.getElementById('daily-btn');
const btnWeekly = document.getElementById('weekly-btn');
const btnMonthly = document.getElementById('monthly-btn');

let timeData;

fetch('./data.json')
    .then(
        (response) => {
            console.log('fetching data');
            if (!response.ok) return console.log('ERROR');
            return response.json();
        }
    ).then(
        (database) => {
            const timeData = database;
            updateTimes(timeData, 'weekly');


            btnDaily.addEventListener('click', () => {
                updateTimes(timeData, 'daily');
                updateButtons(btnDaily);
            });

            btnWeekly.addEventListener('click', () => {
                updateTimes(timeData, 'weekly');
                updateButtons(btnWeekly);
            });

            btnMonthly.addEventListener('click', () => {
                updateTimes(timeData, 'monthly');
                updateButtons(btnMonthly);
            }
            );
        }


    )

function updateTimes(data, timeframe) {
    data.forEach(item => {
        const categoryId = item.title.toLowerCase();
        let current = item.timeframes[timeframe].current;
        let previous = item.timeframes[timeframe].previous;
        if (current === 1) {
            current = current + 'hr';
        } else { current = current + 'hrs'; }
        if (previous === 1) {
            previous = previous + 'hr';
        } else { previous = previous + 'hrs'; }
        document.getElementById(`${categoryId}-current`).textContent = current;
        document.getElementById(`${categoryId}-previous`).textContent = previous;
    });
}

function updateButtons(selected) {
    btnDaily.classList.remove('active');
    btnWeekly.classList.remove('active');
    btnMonthly.classList.remove('active');
    selected.classList.add('active');
}