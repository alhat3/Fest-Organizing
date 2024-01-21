let fileBtn = document.getElementById('event_image');
let fileLabel = document.querySelector('.eventInputs label[for="event_image"]');
let moreInfo = document.getElementById('more_info');
let category = document.getElementById('event_category');
let categoryInput = document.querySelector('.categoryInput');
let aboutOpt = document.getElementById('aboutOpt');
let specificationsOpt = document.getElementById('specificationsOpt');
let create_event = document.getElementById('create_event');
let aboutInput = true;
let specificationsInput = true;
let event_name = document.getElementById('event_name');
let event_price = document.getElementById('event_price');
let event_description = document.getElementById('event_description');
let imgViewer = document.querySelector('.imgViewer');
let cancelBtn = document.getElementById('cancel');
// Choose File and Image Preview Logic
fileBtn.addEventListener('change', () => {

    let fileArr = Array.from(fileBtn.files);
    let totalSize = 0;
    let sizeArr = [];
    imgViewer.innerHTML = '';
    // console.log('fileArr', fileArr.length);
    if (fileArr.length <= 5) {
        fileArr.forEach((file) => {
            totalSize += file.size;
            sizeArr.push(file.size);

        });
        sizeArr.sort((a, b) => a - b);
        console.log('Total size = ', totalSize);
        let url;

        if (totalSize > 5000000) {
            do {
                let bigSize = sizeArr[sizeArr.length - 1];
                fileArr.forEach((file, i) => {
                    if (file.size === bigSize) {
                        fileArr.splice(i, 1);
                    }
                });
                totalSize = 0;
                sizeArr = [];
                fileArr.forEach((file) => {
                    totalSize += file.size;
                    sizeArr.push(file.size);
                });
            } while (totalSize > 5000000);
            fileArr.forEach((file) => {
                let div = document.createElement('div');
                url = URL.createObjectURL(file);
                div.innerHTML = `<img src="${url}" alt="${file.name}" >`;
                // div.innerHTML = `<img src="../static/img/event-img/${file.name}" alt="${file.name}" >`;
                imgViewer.append(div);
            });
            if (fileArr.length == 0) {
                fileLabel.innerHTML = `Choose Files (Maximum-5)`;
            } else if (fileArr.length == 1) {
                fileLabel.innerHTML = `Filename:- <strong>${fileArr[0].name}</strong>`;
            } else {
                fileLabel.innerHTML = fileArr.length + ' Files Selected';
            }
        } else {

            fileArr.forEach((file) => {
                let div = document.createElement('div');
                url = URL.createObjectURL(file);
                div.innerHTML = `<img src="${url}" alt="${file.name}" >`;
                // div.innerHTML = `<img src="../static/img/event-img/${file.name}" alt="${file.name}" >`;
                imgViewer.append(div);
            });
            if (fileArr.length == 0) {
                fileLabel.innerHTML = `Choose Files (Maximum-5)`;
            } else if (fileArr.length == 1) {
                fileLabel.innerHTML = `Filename:- <strong>${fileArr[0].name}</strong>`;
            } else {
                fileLabel.innerHTML = fileArr.length + ' Files Selected';
            }
        }
    } else {
        console.log('Choosen files limit exceeded');
        fileLabel.innerHTML = `Choose Files (Maximum-5)`;
    }
});

// More Info Logic
moreInfo.addEventListener('change', () => {
    let optArr = Array.from(moreInfo.children);
    if (moreInfo.value === 'More Info (Optional)') {
        moreInfo.style.color = '#7c8187';
    } else {
        if (moreInfo.value === 'About Event') {
            if (aboutInput) {
                optArr.forEach((opt, i) => {
                    if (opt.id === 'aboutOpt') {
                        moreInfo.removeChild(moreInfo.children[i]);
                    }
                });
                let aboutEvent = `<div class="eventInputs createdTextarea ">
                <textarea name="about_event" id="about_event "
                placeholder="Write about this event (Optional)"></textarea>
                </div>`;
                categoryInput.insertAdjacentHTML('beforebegin', aboutEvent);
                aboutInput = false;
            }
        } else if (moreInfo.value === 'Specifications') {
            if (specificationsInput) {
                optArr.forEach((opt, i) => {
                    if (opt.id === 'specificationsOpt') {
                        moreInfo.removeChild(moreInfo.children[i]);
                    }
                });
                let specifications = `<div class="eventInputs createdTextarea">
            <textarea name="specifications" id="specifications"
            placeholder="Specifications of the event (Optional)"></textarea>
            </div>`;
                categoryInput.insertAdjacentHTML('beforebegin', specifications);
                specificationsInput = false;
            }
        }
    }
});
// Category Logic
category.addEventListener('change', () => {
    if (category.value === 'Choose Category') {
        category.style.color = '#7c8187';
    } else {
        category.style.color = 'black';
    }
});

//Create event button
create_event.addEventListener('click', (e) => {
    if (event_name.value) {
        if (event_price.value) {
            if (event_description.value) {
                if (category.value === 'Choose Category') {
                    e.preventDefault();
                } else {
                    if (fileBtn.files.length < 1) {
                        console.log('working');
                        e.preventDefault();
                    } else {

                    }
                }
            } else {
                return;
            }
        } else {
            return;
        }
    } else {
        return;
    }
});
// Cancel 
if (cancelBtn) {

    cancelBtn.addEventListener('click', (e) => {
        let confirmation = confirm('Discard changes ?');
        if (confirmation) {
            return history.back();
        } else {
            return e.preventDefault();
        }
    });
}
