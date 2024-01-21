let events = document.querySelectorAll('.event');
let created = document.querySelectorAll('.created');
let buttons = document.querySelectorAll('.buttons');
let p = document.querySelectorAll('.created p');
let deleteBtn = document.querySelectorAll('.deleteBtn');
let ratingSpan = document.querySelectorAll('.rating :nth-child(1)');
let soldArr = document.querySelectorAll('.sold');
events.forEach((event, i) => {
    event.addEventListener('mouseenter', () => {
        p[i].style.display = 'none';
        buttons[i].style.display = 'flex';
    });
    event.addEventListener('mouseleave', () => {
        buttons[i].style.display = 'none';
        p[i].style.display = 'block';

    });
});
// soldArr[0].innerText = 13;
// soldArr[1].innerText = 0;
// soldArr[2].innerText = 4;
// soldArr[3].innerText = 10;
// ratingSpan[0].innerText = 3.6;
// ratingSpan[1].innerText = 0;
// ratingSpan[2].innerText = 2.9;
// ratingSpan[3].innerText = 3;
ratingSpan.forEach((span, i) => {
    let rating = parseFloat(span.innerText);
    if (parseInt(soldArr[i].innerText) > 0) {
        if (rating < 3) {
            span.style.color = 'red';
        } else if (rating > 3.5) {
            span.style.color = 'lightgreen';
        } else {
            span.style.color = '';
        }
    }
});
deleteBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let result = confirm('Do you want to delete this event permanently');
        if (!result) {
            e.preventDefault();
        }
    });
});