const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', (event) => {  
            if(event.key.match(/[^а-яё 0-9]/ig)) {
                event.preventDefault();
            }
        });
        // 'keypress' - отслеживание, пользователь нажал на определенную клавишу
        // [] диапазон, ^ - начало строки, i - любой регистр, g - все знаки
    });
};

export {checkTextInputs};