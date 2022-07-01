while (!document.getElementById('search-input')) {
}

document.getElementById('search-input').removeEventListener('focus', handleSearchFocus);
document.getElementById('search-input').addEventListener('focus', handleSearchFocus);


function getDossierDefaultPrefix() {
    let currentYear2Digits = new Date().getFullYear().toString().slice(-2)
    return `I${currentYear2Digits}_`
}

function logDebug(log) {
    console.debug(log);
}

function startWithRegex(s, regex) {
    let regexMatchResult = s.match(regex);
    return  regexMatchResult && regexMatchResult.length > 0;
}

function startWithLetter(s) {
    return startWithRegex(s, `^[a-zA-Z]`);
}
function handleInputPaste(event) {
    let input = document.getElementById('auto-complete_value')
    let clipboardText = event.clipboardData.getData('text')
    if (startWithLetter(clipboardText) && startWithLetter(input.value)) {
        input.value = ``;
    }
}

function startWithNumber(s) {
    return startWithRegex(s, `^[0-9]`);
}

function dispatchChange(input) {
    if ("createEvent" in input) {
        var evt = input.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        input.dispatchEvent(evt);
    }
    else
        input.fireEvent("onchange");
}

function handleInputKeydown(event) {
    logDebug(`handleInputKeydown Started`);
    let input = document.getElementById('auto-complete_value')
    logDebug(`handleInputKeydown Input ${input}`);
    let letter = event.key;
    logDebug(`handleInputKeydown Input.value ${input.value}`);
    logDebug(`handleInputKeydown StartWithNumber ${ startWithNumber(letter)}`);
    if (!input.value && startWithNumber(letter)) {
        input.value = `${getDossierDefaultPrefix()}`;
    }
}

function handleSearchFocus() {
    let input = document.getElementById('auto-complete_value')
    if (!input.value) {
        input.value = getDossierDefaultPrefix();
    }
    input.removeEventListener('paste', handleInputPaste);
    input.addEventListener('paste', handleInputPaste);
    input.removeEventListener('keydown', handleInputKeydown);
    input.addEventListener('keydown', handleInputKeydown);
}
