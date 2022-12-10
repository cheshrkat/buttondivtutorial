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
    // Input mode sets a data attribute on the body element according to whether the user is using a mouse or keyboard.
    // You don't have to use this in your TUTORIAL solution but it is available.
    /*! Input Mode v0.1.0, 2016-12-04. MIT license. github.com/cheshrkat/input-mode */
    function inputMode(a) { function b(a) { a != g && (g = a, d.setAttribute(e, g)) } function c(a, b, c) { var d; return function () { var e = this, f = arguments, g = function () { d = null, c || a.apply(e, f) }, h = c && !d; clearTimeout(d), d = setTimeout(g, b), h && a.apply(e, f) } } var a = a || {}, d = a.element || document.getElementsByTagName("body")[0], e = a.attr || "data-inputmode", f = a.delay || 200, g = a.default || "mouse"; document.addEventListener && (d.setAttribute(e, g), window.addEventListener("mousemove", c(function () { b("mouse") }, f, !0)), window.addEventListener("mousedown", c(function () { b("mouse") }, f, !0), !0), window.addEventListener("pointerdown", c(function () { b("mouse") }, f, !0), !0), window.addEventListener("touchstart", c(function () { b("touch") }, f, !0), !0), window.addEventListener("keydown", c(function () { b("keyboard") }, f, !0), !0)) }
    inputMode({
        'element': document.getElementsByName('body')[0],
        'attr': 'data-inputmode',
        'delay': 100,
        'default': 'keyboard'
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