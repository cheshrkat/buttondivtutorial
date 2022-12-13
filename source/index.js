(function () {

    // ----------------------------------------
    // Code for the generic browser button (no custom styling)
    const $defaultButton = document.getElementById('defaultbutton');
    const $defaultButtonCounter = document.getElementById('defaultbuttoncounter');
    let defaultButtonCount = 0;

    // Count clicks and set the visible counter
    $defaultButton.addEventListener('click', function () {
        $defaultButtonCounter.textContent = ++defaultButtonCount;
    });

    // ----------------------------------------
    // Code for the BUTTON
    const $button = document.getElementById('countbutton');
    const $buttonCounter = document.getElementById('buttoncounter');
    let buttonCount = 0;

    // Count clicks and set the visible counter
    $button.addEventListener('click', function () {
        $buttonCounter.textContent = ++buttonCount;
    });

    // ----------------------------------------
    // TUTORIAL: code for the DIV
    const $div = document.getElementById('countdiv');
    const $divCounter = document.getElementById('divcounter');
    let divCount = 0;

    function divCounter(event) {
        // TUTORIAL - to get you started, uncomment the following line to get the first test to pass.
        // $divCounter.textContent = ++divCount;
    }

    // Count clicks and set the visible counter
    $div.addEventListener('click', function (event) {
        divCounter(event);
    });
    // TUTORIAL: you will need to add another event listener here to handle the keyboard.

    // ----------------------------------------
    // Shared code to enabled and disable the controls
    const $checkbox = document.getElementById('enablecontrols');

    $checkbox.onchange = function () {
        if ($checkbox.checked) {
            $defaultButton.removeAttribute('disabled');
            $button.removeAttribute('disabled');
            // TUTORIAL: you will need to handle $div here
        } else {
            $defaultButton.setAttribute('disabled', 'disabled');
            $button.setAttribute('disabled', 'disabled');
            // TUTORIAL: you will need to handle $div here
        }
    };

})();