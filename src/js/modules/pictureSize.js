const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showImg(block) {
        const img = block.querySelector('img');
        // something.png -> something-1.png
        img.src = img.src.slice(0, -4) + '-1.png';
        // slice(0, -4) : something.png -> something (т.е. -4 обрезает 4 символы с конца)
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
        // querySelectorAll('p:not(.sizes-hit)') -> все селекторы p, кроме p.sizes-hit
    }

    // создаем обратную функцию hideImg относительно showImg
    function hideImg(block) {
        const img = block.querySelector('img');
        // something-1.png -> something.png
        img.src = img.src.slice(0, -6) + '.png';
        // slice(0, -6) : something-1.png -> something (т.е. -6 обрезает 6 символы с конца)
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block';
        });
        // querySelectorAll('p:not(.sizes-hit)') -> все селекторы p, кроме p.sizes-hit
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {  // Наведение мыши на блок 
            showImg(block);
        }); 

        block.addEventListener('mouseout', () => {  // выводим мышку из блока 
            hideImg(block);
        }); 
    });
};

export {pictureSize};