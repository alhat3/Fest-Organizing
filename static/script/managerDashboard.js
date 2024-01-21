


const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const jan_June = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'];
const jul_Dec = ['Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const startDate = "2020-1-15T08:30:09.143Z";// new Date().toISOString()
const startYear = startDate.split('-')[0];
const startMonth = parseInt(startDate.split('-')[1]);
const startDay = startDate.split('-')[2].split('T')[0];
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
let modeColor = 'white';
let label;
let labels = [];
let data = [100, 50, 100, 20, 80, 120];
let dataLine = {
    labels: jan_June,
    datasets: [
        {
            label: currentYear,
            data: data,
            borderColor: 'rgb(75, 192, 192)',
        }
    ]
};
let dataPie = {
    labels: [
        'In Stocks ',
        'Out of Stocks',
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [100, 10,],
        backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
        ],
        hoverOffset: 4
    }]
};
const configLine = {
    type: "line",
    data: dataLine,
    options: {
        plugins: {
            legend: {
                labels: {
                    color: modeColor,
                    font: {
                        size: 18
                    }
                }
            }
        },
        scales: {
            y: {
                min: 0,
                grid: {
                    color: modeColor
                },
                ticks: {
                    color: modeColor,
                    font: {
                        size: 18
                    }
                },

                // max: 150
            },
            x: {
                grid: {
                    color: modeColor
                },
                ticks: {
                    color: modeColor,
                    font: {
                        size: 18
                    }
                }
            }
        }
    }
};
const configPie = {
    type: "pie",
    data: dataPie,
    options: {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        layout: {
            padding: 4
        }
    }
};
// Select Logic
let select = document.getElementById('timeLine');
const loopTime = (currentYear - startYear) + 1;
// console.log('startYear', startYear);
// console.log('currentYear', currentYear);
// console.log('loopTime', loopTime);
let optionYear = currentYear;
function createOption() {
    for (let i = 0; i < (loopTime * 2); i++) {
        let option = document.createElement('option');
        option.className = 'lineOption';
        if (i == 0) {
            if (currentMonth >= 6) {
                console.log('wokring');
                option.value = `${currentYear} (Jul-Dec)`;
                option.innerHTML = `${currentYear} (Jul-Dec)`;
                select.append(option);
            }
        } else if (i == 1) {
            option.value = `${currentYear} (Jan-June)`;
            option.innerHTML = `${currentYear} (Jan-June)`;
            select.append(option);
        } else {
            if (i % 2 == 0) {
                optionYear--;
                option.value = `${optionYear} (Jul-Dec)`;
                option.innerHTML = `${optionYear} (Jul-Dec)`;
                select.append(option);

            }
            if (i % 2 == 1) {
                option.value = `${optionYear} (Jan-June)`;
                option.innerHTML = `${optionYear} (Jan-June)`;
                select.append(option);

            }

        }
    }
}
createOption();

let options = document.querySelectorAll('.lineOption');
select.addEventListener('change', () => {
    let selectedValue = select.value.split(' ');
    let selectedData = data;
    if (selectedValue[1] === '(Jan-June)') {
        lineChart.data.labels = jan_June;
        lineChart.data.datasets[0].label = selectedValue[0];
        lineChart.data.datasets[0].data = data.reverse();
        lineChart.update();
    } else if (selectedValue[1] === '(Jul-Dec)') {
        lineChart.data.labels = jul_Dec;
        lineChart.data.datasets[0].label = selectedValue[0];
        lineChart.data.datasets[0].data = selectedData.reverse();
        lineChart.update();

    } else {
        return;
    }
});
var lineChart = new Chart(document.getElementById("lineChart"), configLine);
var pieChart = new Chart(document.getElementById("pieChart"), configPie);

//color change logic
let lineCanvas = document.getElementById('lineChart');
let pieCanvas = document.getElementById('pieChart');
modeBtn.addEventListener('click', (e) => {
    if (e.target.id === 'sun') {
        console.log('sun');
        modeColor = 'black';
        select.style.backgroundColor = 'white';
        select.style.color = 'black';
        lineCanvas.classList.add('bg-white');
        lineCanvas.classList.remove('bg-gray-700');
        lineChart.options.scales.x.grid.color = modeColor;
        lineChart.options.plugins.legend.labels.color = modeColor;
        lineChart.options.scales.y.grid.color = modeColor;
        lineChart.options.scales.x.ticks.color = modeColor;
        lineChart.options.scales.y.ticks.color = modeColor;
        lineChart.update();
    } else if (e.target.id === 'moon') {
        modeColor = 'white';
        lineCanvas.classList.add('bg-gray-700');
        lineCanvas.classList.remove('bg-white');
        select.style.backgroundColor = 'black';
        select.style.color = 'white';

        lineChart.options.scales.x.grid.color = modeColor;
        lineChart.options.plugins.legend.labels.color = modeColor;
        lineChart.options.scales.y.grid.color = modeColor;
        lineChart.options.scales.x.ticks.color = modeColor;
        lineChart.options.scales.y.ticks.color = modeColor;
        lineChart.update();
    } else {
        return;
    }
});

