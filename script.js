let outputField = document.querySelector('.outputField input');
let copyLink = document.querySelector('.copyLink');
let scale = document.querySelector('.scale');
let meaning = document.querySelector('.meaning');
let range = document.querySelector('.passwordLength input');
let generatePassword = document.querySelector('.generatePassword');
let option = document.querySelectorAll('.options input');

let sets = {
    lowercase: 'qwertyuiopasdfghjklzxcvbnm',
    uppercase: 'QWERTYUIOPASDFGHJKLZXCVBNM',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+"№;:?-='
}

function getRandomArbitrary(max) {
    return Math.random() * (max - 1) + 1;
}

function generate(){
    let staticPassword = '';
    let excludeDuplicate = false;
    let resultPassword = '';

    copyLink.classList.remove('active');

    option.forEach((value) => {
        if (value.checked) {
            if (value.id != 'includeSpaces' && value.id != 'excludeDuplicate') {
                staticPassword += sets[value.id];
            }
            else if (value.id === 'includeSpaces') {
                staticPassword += `                    `;
            }
            else {
                excludeDuplicate = true;

            }
        }
    });

    for (let i = 0; i < range.value; i++) {
        let value = staticPassword[Math.floor(getRandomArbitrary(staticPassword.length))];
        if (excludeDuplicate) {
            if (resultPassword.includes(value)) {
                i--;
            }
            else {
                resultPassword += value;
            }
        }
        else {
            resultPassword += value;
        }
    }
    outputField.value = resultPassword;
};

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }

range.addEventListener('input', () => {
    meaning.innerHTML = range.value;
    scale.classList.remove('start', 'midlle', 'end')
    range.value <= 6 ? scale.classList.add('start') : range.value <= 15 ? scale.classList.add('midlle') : scale.classList.add('end');
});
copyLink.addEventListener('click', () => {
    copyLink.classList.add('active');
    copyToClipboard(outputField.value);
});

generatePassword.addEventListener('click', generate);
range.addEventListener('input', generate);
window.onload = range.value = 1;