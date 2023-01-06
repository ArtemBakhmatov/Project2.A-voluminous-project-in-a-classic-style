const drop = () => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea (перетаскиваемый элемент попадает в допустимую цель сброса)
    // dragexit *
    // dragleave - объект за пределами dropArea (перетаскиваемый элемент покидает допустимую цель сброса)
    // dragover - объект зависает над dropArea (элемент перетаскивается над допустимой целью сброса каждые несколько сотен миллисекунд)
    // dragstart *
    // drop - объект отправлен в dropArea (элемент сброшен в допустимую зону сброса)

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation();  // Прекращает дальнейшую передачу текущего события.
    }

    function highlight(item) {  // добавить метку 
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }
    // closest() -> Находим ближайший класс (родитель)

    function unhighlight(item) {  // убрать метку
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (event) => { // элемент сброшен в допустимую зону сброса
            input.files = event.dataTransfer.files;
            // event.dataTransfer.files -> файловая струкутура
            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export {drop};