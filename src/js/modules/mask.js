const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
        elem.focus(); // установили фокус на элементе

        if(elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange(); // диапазон

            range.corange.collapse(true); //объединять граничные точки диапазона 
            range.moveEnd('character', pos); // где будет конечная точка нашего выделения
            range.moveStart('character', pos); // с какого символа будет начинаться выделение
            range.select(); // объеденяет сразу moveStart и moveEnd
           
        }
        // setSelectionRange() устанавливает начальное и конечное положение выделения текста в элементе
        // createTextRange()  текстовый диапазон нулевой и более длины 
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
                 i = 0,
               def = matrix.replace(/\D/g, ''),     // получаем все не цифры // статичная
               val = this.value.replace(/\D/g, ''); // получаем все не цифры // динамичная

        if(def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) { // . -> каждый элемент сущ-ет в строке
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            // charAt возвращает символ, стоящий на указанной позиции в строке
            // \d -> все цифры, [] -> диапазон
        });

        if(event.type === 'blur') { // blur - событие когда мы кликнули вне инпута
            if(this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this); // устанавливаем позицию куросора
            //setCursorPosition(кол-во символов которые есть инпуте, ссылка на тот элемент который сейчас в роботе)
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
        // focus вызывается в момент фокусировки
        // blur – вызывается когда элемент теряет фокус. 
        // Input - событие, срабатывающее каждый раз при изменении значения
    })
};

export {mask}; 