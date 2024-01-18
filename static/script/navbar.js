let burger = document.getElementById('burger');
let closeBtn = document.getElementById('closeBtn');
let main = document.getElementById('main');
let dimmed = document.getElementById('dimmed');
let sidePanel = document.getElementById('sidePanel');
let tabs1_tab1 = document.getElementById('tabs-1-tab-1');//Womens
let tabs1_tab2 = document.getElementById('tabs-1-tab-2');//Mens
let tabs1_panel1 = document.getElementById('tabs-1-panel-1');//Womens
let tabs1_panel2 = document.getElementById('tabs-1-panel-2');//Mens
let menList = document.getElementById('menList');
let menListBtn = document.getElementById('menListBtn');
let womenList = document.getElementById('womenList');
let womenListBtn = document.getElementById('womenListBtn');
let logoutBtn = document.getElementById('logoutBtn');
let profileBtn = document.getElementById('profileBtn');
let profileMenu = document.getElementById('profileMenu');
// Global
// document.addEventListener('click', (e) => {
//     console.log(e.target);
//     if (e.target.id == 'profileBtn' || e.target.id == 'profileMenu') {
//         console.log(e.target);
//     }
// });


//Burger Logic
burger.addEventListener('click', () => {
    main.removeAttribute('style');
    dimmed.removeAttribute('style');
    sidePanel.removeAttribute('style');
    setTimeout(() => {
        dimmed.classList.add('opacity-100');
        sidePanel.classList.add('translate-x-0');
        dimmed.classList.remove('opacity-0');
        sidePanel.classList.remove('-translate-x-full');
    });
});
closeBtn.addEventListener('click', () => {
    dimmed.classList.add('opacity-0');
    sidePanel.classList.add('-translate-x-full');
    dimmed.classList.remove('opacity-100');
    sidePanel.classList.remove('translate-x-0');

});
dimmed.addEventListener('transitionend', () => {
    if (!dimmed.classList.contains('opacity-100')) {
        sidePanel.setAttribute('style', 'display:none;');
        dimmed.setAttribute('style', 'display:none;');
        main.setAttribute('style', 'display:none;');
    }

});
//Tab logic
// tabs1_tab1.addEventListener('click', () => {
//     tabs1_tab2.classList.add('text-gray-900');
//     tabs1_tab2.classList.add('border-transparent');
//     tabs1_tab1.classList.add('text-indigo-600');
//     tabs1_tab1.classList.add('border-indigo-600');
//     tabs1_tab2.classList.remove('text-indigo-600');
//     tabs1_tab2.classList.remove('border-indigo-600');
//     tabs1_tab1.classList.remove('text-gray-900');
//     tabs1_tab1.classList.remove('border-transparent');
//     tabs1_panel2.setAttribute('style', 'display:none;');
//     tabs1_panel1.removeAttribute('style');
// });
// tabs1_tab2.addEventListener('click', () => {
//     tabs1_tab1.classList.add('text-gray-900');
//     tabs1_tab1.classList.add('border-transparent');
//     tabs1_tab2.classList.add('text-indigo-600');
//     tabs1_tab2.classList.add('border-indigo-600');
//     tabs1_tab1.classList.remove('text-indigo-600');
//     tabs1_tab1.classList.remove('border-indigo-600');
//     tabs1_tab2.classList.remove('text-gray-900');
//     tabs1_tab2.classList.remove('border-transparent');
//     tabs1_panel1.setAttribute('style', 'display:none;');
//     tabs1_panel2.removeAttribute('style');
// });
// //Lists logic
// womenListBtn.addEventListener('click', () => {
//     if (!womenList.hasAttribute('style')) {
//         womenListBtn.classList.add('text-gray-700');
//         womenListBtn.classList.add('border-transparent');
//         womenListBtn.classList.add('hover:text-indigo-600');
//         womenListBtn.classList.remove('text-indigo-600');
//         womenListBtn.classList.remove('border-indigo-600');
//         womenList.classList.add('opacity-0');
//     } else {
//         menListBtn.classList.add('text-gray-700');
//         menListBtn.classList.add('border-transparent');
//         menListBtn.classList.add('hover:text-indigo-600');
//         womenListBtn.classList.add('text-indigo-600');
//         womenListBtn.classList.add('border-indigo-600');
//         menListBtn.classList.remove('text-indigo-600');
//         menListBtn.classList.remove('border-indigo-600');
//         womenListBtn.classList.remove('text-gray-700');
//         womenListBtn.classList.remove('border-transparent');
//         womenListBtn.classList.remove('hover:text-indigo-600');
//         //List opacity
//         menList.classList.remove('duration-200');
//         womenList.removeAttribute('style');
//         womenList.classList.add('duration-200');
//         setTimeout(() => {
//             menList.classList.add('opacity-0');
//             womenList.classList.remove('opacity-0');
//         });
//     }

// });
// menListBtn.addEventListener('click', () => {
//     if (!menList.hasAttribute('style')) {
//         menListBtn.classList.add('border-transparent');
//         menListBtn.classList.add('text-gray-700');
//         menListBtn.classList.add('hover:text-indigo-600');
//         menListBtn.classList.remove('text-indigo-600');
//         menListBtn.classList.remove('border-indigo-600');
//         menList.classList.add('opacity-0');
//     } else {
//         womenListBtn.classList.add('text-gray-700');
//         womenListBtn.classList.add('border-transparent');
//         womenListBtn.classList.add('hover:text-indigo-600');
//         menListBtn.classList.add('text-indigo-600');
//         menListBtn.classList.add('border-indigo-600');
//         womenListBtn.classList.remove('text-indigo-600');
//         womenListBtn.classList.remove('border-indigo-600');
//         menListBtn.classList.remove('text-gray-700');
//         menListBtn.classList.remove('border-transparent');
//         menListBtn.classList.remove('hover:text-indigo-600');
//         //List opacity
//         womenList.classList.remove('duration-200');
//         menList.removeAttribute('style');
//         menList.classList.add('duration-200');
//         setTimeout(() => {
//             womenList.classList.add('opacity-0');
//             menList.classList.remove('opacity-0');
//         });
//     }
// });
// womenList.addEventListener('transitionend', (e) => {
//     if (womenList.classList.contains('opacity-0')) {
//         womenList.setAttribute('style', 'display:none;');
//     }
//     console.log('worjkign');
//     // console.log('women', e.elapsedTime);
// });
// menList.addEventListener('transitionend', (e) => {
//     if (menList.classList.contains('opacity-0')) {
//         menList.setAttribute('style', 'display:none;');
//     }
//     // console.log('men', e.elapsedTime);
// });
// Logout button logic
logoutBtn.addEventListener('click', (e) => {
    let confirmation = confirm('Do you want to logout ?');
    if (!confirmation) {
        e.preventDefault();
    }
});

// Profile Button Logic
// profileBtn.addEventListener('click', () => {
//     console.log('click');
//     if (profileMenu.classList.contains('hidden')) {
//     } else {


//     }

// });

// profileBtn.addEventListener('click', () => {

//     profileMenu.classList.toggle('hidden');
//     profileMenu.classList.toggle('outline');

//     // if (profileMenu.classList.contains('hidden')) {
//     //     console.log('aaya');
//     //     profileBtn.classList.add('outline');
//     //     profileMenu.classList.remove('hidden');
//     // } else {
//     //     profileBtn.classList.remove('outline');
//     //     profileMenu.classList.add('hidden');

//     // }
// });
// profileBtn.addEventListener('focus', () => {
//     console.log('focus');
//     profileBtn.classList.add('outline');
//     profileMenu.classList.remove('hidden');
// });
// profileBtn.addEventListener('focusout', (e) => {
//     console.log('disappear');
//     profileBtn.classList.remove('outline');
//     profileMenu.classList.add('hidden');
// });
profileBtn.addEventListener('click', () => {
    console.log('click');
    profileBtn.classList.toggle('outline');
    profileMenu.classList.toggle('hidden');
});

// profileMenu.addEventListener('click', (e) => {
//     e.stopPropagation(); // prevent the click event from bubbling up
// });

document.addEventListener('click', (e) => {
    if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        // if the user clicked outside the button and menu, hide the menu
        profileBtn.classList.remove('outline');
        profileMenu.classList.add('hidden');
    }
});


// womenListBtn.addEventListener('mouseleave', () => {
//     womenListBtn.classList.add('text-gray-700');
//     womenListBtn.classList.add('border-transparent');
//     womenListBtn.classList.add('hover:text-indigo-600');
//     womenListBtn.classList.remove('text-indigo-600');
//     womenListBtn.classList.remove('border-indigo-600');
//     womenList.classList.add('opacity-0');
// });
// menListBtn.addEventListener('mouseleave', () => {
//     menListBtn.classList.add('border-transparent');
//     menListBtn.classList.add('text-gray-700');
//     menListBtn.classList.add('hover:text-indigo-600');
//     menListBtn.classList.remove('text-indigo-600');
//     menListBtn.classList.remove('border-indigo-600');
//     menList.classList.add('opacity-0');
// });