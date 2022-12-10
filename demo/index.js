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
    /*! Input Mode v0.1.0, 2016-12-04. MIT license. github.com/cheshrkat/input-mode */
    function inputMode(a) { function b(a) { a != g && (g = a, d.setAttribute(e, g)) } function c(a, b, c) { var d; return function () { var e = this, f = arguments, g = function () { d = null, c || a.apply(e, f) }, h = c && !d; clearTimeout(d), d = setTimeout(g, b), h && a.apply(e, f) } } var a = a || {}, d = a.element || document.getElementsByTagName("body")[0], e = a.attr || "data-inputmode", f = a.delay || 200, g = a.default || "mouse"; document.addEventListener && (d.setAttribute(e, g), window.addEventListener("mousemove", c(function () { b("mouse") }, f, !0)), window.addEventListener("mousedown", c(function () { b("mouse") }, f, !0), !0), window.addEventListener("pointerdown", c(function () { b("mouse") }, f, !0), !0), window.addEventListener("touchstart", c(function () { b("touch") }, f, !0), !0), window.addEventListener("keydown", c(function () { b("keyboard") }, f, !0), !0)) }
    inputMode({
        'element': document.getElementsByName('body')[0],
        'attr': 'data-inputmode',
        'delay': 100,
        'default': 'keyboard'
    });

    // ----------------------------------------
    // Code for the DIV
    const $div = document.getElementById('countdiv');
    const $divCounter = document.getElementById('divcounter');
    let divCount = 0;

    function divCounter(event) {
        if (event.target.getAttribute('aria-disabled') != "true") {
            $divCounter.textContent = ++divCount;
        }
    }

    // Count clicks and set the visible counter
    $div.addEventListener('click', function (event) {
        divCounter(event);
    });

    // Count keypresses and set the visible counter
    $div.addEventListener('keypress', function (event) {
        // check if the keypress was spacebar or enter, same as button
        if (event.code == "Enter" || event.code == "Space") {
            divCounter(event);
        }
    });
    
    /**
     * Using Mutationobserver to toggle tabindex when disabled is more complex than you strictly need.
     * This solution relates to the original conference talk, where I was showing just how much buttons
     * do for you - you don't have to manually handle tabindex, focus, etc on a disabled button.
     * So this was pushing a really pure interpretation of "exactly the same as a button"/
     * For the tutorial you might like to use a simpler approach and just handle this in $checkbox.onchange
     */
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // If the mutation is to an aria-disabled element...
            if (mutation.attributeName === 'aria-disabled') {
                let $el = mutation.target;
                // ...and it's one of our divbuttons
                if ($el.classList.contains('divbutton')) {
                    // ...then set or remove tabindex
                    if ($el.getAttribute('aria-disabled') === 'true') {
                        $el.removeAttribute('tabindex');
                    } else {
                        $el.setAttribute('tabindex', '0')
                    }
                }
            }
        });
    });
    // Do this for all our divbuttons...
    let divButtons = document.querySelectorAll('.divbutton');
    for (let i = 0; i < divButtons.length; i++) {
        observer.observe(divButtons[i], { attributes: true });
    }

    // ----------------------------------------
    // Shared code to enabled and disable the controls
    const $checkbox = document.getElementById('enablecontrols');

    $checkbox.onchange = function () {
        if ($checkbox.checked) {
            $defaultButton.removeAttribute('disabled');
            $button.removeAttribute('disabled');
            $div.setAttribute('aria-disabled', 'false');
        } else {
            $defaultButton.setAttribute('disabled', 'disabled');
            $button.setAttribute('disabled', 'disabled');
            $div.setAttribute('aria-disabled', 'true');
        }
    };

})();