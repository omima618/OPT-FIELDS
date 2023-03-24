const deleteKeys = ['Backspace', 'Delete', 'Unidentified']
const inputs = document.querySelectorAll('.digits-holder input');

inputs.forEach((inp, i) => {
    inp.dataset.index = i;
    inp.addEventListener('keypress', filterCodeHandler);
    inp.addEventListener('keyup', handleVerificationCode);
    inp.addEventListener('paste', handlePasteCode);
});

// INPUTS JUST ACCEPTING NUMBERS
function filterCodeHandler(e) {
    const ALLOWED_CHARACTERS = /[0-9]+/;

    if (e.key == 'Enter') {
        return;
    }

    if (!ALLOWED_CHARACTERS.test(e.key)) {
        e.preventDefault();
    }
}

// PASTE CODE WITH SAME LENGTH OF INPUTS OR LESS
function handlePasteCode(e) {
    const data = e.clipboardData.getData('text');
    const value = data.split('');

    if (value.length === inputs.length) {
        inputs.forEach((inp, i) => {
                inp.value = value[i];
        });
        inputs[inputs.length - 1].focus();
    } else {
        e.preventDefault();
    }
}

function handleVerificationCode(e) { 
    const inp = e.target;
    let value = inp.value;
    inp.value = value ? value[0] : '';
    let fieldIndex = +inp.dataset.index;

    // REPLACE CURRENT INPUT VALUE 
    if (inp.value !== '' && !isNaN(+e.key)) {
        inp.value = e.key;
    }

    // MOVE TO NEXT INPUT
    if (value.length > 0 && fieldIndex < inputs.length - 1) {
        document.querySelector(`.digits-holder input[data-index='${fieldIndex + 1}']`).focus();
    }

    // DELETE & BACK TO PREV INPUT
    if (deleteKeys.includes(e.key) && fieldIndex > 0) {
        document.querySelector(`.digits-holder input[data-index='${fieldIndex - 1}']`).focus();
    }
}

