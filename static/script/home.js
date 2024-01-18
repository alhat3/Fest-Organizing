let fashionRow = document.getElementById('fashion');
let eventBox = document.querySelectorAll('.eventBox');
eventBox.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.id === 'sportsBox') {

            window.scrollBy(0, 1783 - window.scrollY);

        } else if (box.id === 'artsBox') {
            window.scrollBy(0, 1415 - window.scrollY);

        } else if (box.id === 'talentHuntBox') {
            window.scrollBy(0, 1048 - window.scrollY);

        } else if (box.id === 'hackathonBox') {
            window.scrollBy(0, 672 - window.scrollY);
        }
    });
});
window.addEventListener('scroll', () => {
    console.log(parseInt(window.scrollY));

});