const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
        burgerElem = document.querySelector(burgerSelector);
    
    menuElem.style.display = 'none';

    burgerElem.addEventListener('click', () => {
        if(menuElem.style.display == 'none' && window.screen.availWidth < 993) {
            menuElem.style.display = 'block';
        } else {
            menuElem.style.display = 'none';
        }
        // window.screen.availWidth -> ширина экрана (медиа запрос) в пикселях
    });

    window.addEventListener('resize', () => { // 'resize' -> изменение размера экрана
        if(window.screen.availWidth > 992) {
            menuElem.style.display = 'none';
        }
    });
};

export {burger};