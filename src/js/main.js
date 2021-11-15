window.addEventListener('DOMContentLoaded', () => {
  'use strict'

  const openMenu = (triggerBtn, menuSelector, activeClassBtn, activeClassMenu) => {
    const btn = document.querySelector(triggerBtn);
    const menu = document.querySelector(menuSelector);


    btn.addEventListener('click', function() {
      this.classList.toggle(activeClassBtn);
      menu.classList.toggle(activeClassMenu)
    });

  };

  openMenu('.btn-menu', '.header-menu_mobile', 'btn-menu_active', 'header-menu_mobile_active');

});