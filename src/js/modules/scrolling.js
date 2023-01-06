const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);  // стрелка справа внизу

    window.addEventListener('scroll', () => {         // 'scroll' -> скролим   
        if (document.documentElement.scrollTop > 1650) {  // пролистали сверху > 1650
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // прокрутка js через requestAnimationFrame

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });


    /* // Чистая прокрутка js

    const element = document.documentElement,
          body = document.body;

    const calcScroll = () => {
        upElem.addEventListener('click', function(event) {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop); // сколько пролистали сверху

            if (this.hash !== '') {  // hash -> решетка в поле браузера
                event.preventDefault();  // без перезагрузки страницы
                let hashElement = document.querySelector(this.hash), // получаем строку без решетки
                    hashElementTop = 0;

                while (hashElement.offsetParent) {    // относительно родителя
                    hashElementTop += hashElement.offsetTop;  // сколько px осталось до родителя
                    hashElement = hashElement.offsetParent;   // обращаемся к родителю
                }

                hashElementTop = Math.round(hashElementTop);
                smoothScroll(scrollTop, hashElementTop, this.hash);
            }
        });
    };

    const smoothScroll = (from, to, hash) => {// (откуда будем начинать, куда мы будем иддти, hash)
        let timeInterval = 1,  // стандартное значение 
            prevScrollTop,     // предшествующее значение 
            speed;             // скорость

        if (to > from) {
            speed = 30;       // движение сверху вниз
        } else {
            speed = -30;      // обратное движение
        }
        
        let move = setInterval(function() {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (
                prevScrollTop === scrollTop ||
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move);
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
            } else {
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = scrollTop;
            }
        }, timeInterval);
    };

    calcScroll(); */
};

export {scrolling};