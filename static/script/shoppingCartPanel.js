
// let side_panel = document.getElementById('side-panel');
// let shoppingCartSidePanel = document.getElementById('shopping-cart-side-panel');
// let side_panel_bg = document.getElementById('side-panel-bg');
// let shoppingCartBtn = document.getElementById('shopping-cart-btn');
// let sidePanelCloseBtn = document.getElementById('side-panel-close-btn');
// let continueShoptBtn = document.getElementById('continueShopBtn');
// //Shopping cart panel
// shoppingCartBtn.addEventListener('click', () => {
//     shoppingCartSidePanel.removeAttribute('style');
//     side_panel_bg.removeAttribute('style');
//     side_panel.removeAttribute('style');
//     setTimeout(() => {
//         side_panel_bg.classList.add('opacity-100');
//         side_panel.classList.add('translate-x-0');
//         side_panel_bg.classList.remove('opacity-0');
//         side_panel.classList.remove('translate-x-full');
//     });
// });
// sidePanelCloseBtn.addEventListener('click', () => {
//     side_panel.classList.add('translate-x-full');
//     side_panel_bg.classList.add('opacity-0');
//     side_panel.classList.remove('translate-x-0');
//     side_panel_bg.classList.remove('opacity-100');

// });
// continueShoptBtn.addEventListener('click', () => {
//     side_panel.classList.add('translate-x-full');
//     side_panel_bg.classList.add('opacity-0');
//     side_panel.classList.remove('translate-x-0');
//     side_panel_bg.classList.remove('opacity-100');

// });
// side_panel_bg.addEventListener('transitionend', () => {
//     if (!side_panel_bg.classList.contains('opacity-100')) {
//         side_panel.setAttribute('style', 'display:none;');
//         side_panel_bg.setAttribute('style', 'display:none;');
//         shoppingCartSidePanel.setAttribute('style', 'display:none;');
//     }
// });
