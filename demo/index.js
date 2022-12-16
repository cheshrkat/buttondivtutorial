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