# Button vs. Div Frontend Accessibility Tutorial

> **Warning**
> This tutorial is in beta, needs testing and almost certainly contains a few mistakes. If you find a problem please log an issue or send me a toot: [mastodon.social/@200ok](https://mastodon.social/@200ok)

This is a test-driven tutorial designed to teach you all the things HTML `button` elements actually do, by replicating their functionality on a `div` element using HTML, CSS and JavaScript. Note that in production, you really should just use a `button` - but after this you'll understand why. Also if you are maintaining existing code that relies on clickable `div` elements, it will help you understand how to make them more accessible.

The tutorial runs through a modified version of the build I described at A11y Camp 2019, in my talk "Clickable DIVs and Other Icebergs". You can view the talk at https://www.youtube.com/watch?v=VxoiHb4aqXg but it's not required to complete the tutorial. The main modification is that this tutorial applies a mild custom design to both elements, instead of trying to replicate the design of a default button.

## Prerequisite knowledge

* You need to have basic knowledge of HTML, CSS and JavaScript/DOM scripting
* You should also be able to execute NPM commands on the command line

[MDN has a beginner web curriculum](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web) including a [command line crash course](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line) if you need them.

## The tutorial task

The task is to make an HTML `div` element look, feel and work the same as an HTML `button` for the same basic functionality (a click counter). You confirm this by making the end-to-end test suite pass. 

There is a detailed specification so you can understand the functionality to replicate; and the readme will guide you through the steps. Finally, if you get stuck there is a demo implementation that passes all the tests; so you can refer to that if you need to.

## The specification

Behaviour:

* Clicking the DIV must increment the counter for the DIV
* You must be able to put focus on the DIV by hitting the TAB key and move back off with SHIFT+TAB
* You must be able to increment the counter by pressing ENTER or SPACEBAR while the DIV has focus
* When you hover over the DIV, the mouse cursor should look the same as when you hover a BUTTON
* If you click and drag on the button, the text should not select

Style:

* The DIV must look the same as the BUTTON in all states; including resting state, focus, hover, active, clicked and disabled. Note you should copy and paste the exact colour codes, gradients, etc to ensure tests pass.
* In addition to the visual treatment, the layout of the DIV be the same as well - it should only be as wide as the text requires

Additional requirements when disabled:

* The DIV must look the same as the disabled BUTTON
* The DIV must not respond to click functionally - that is, the counter must not increment if the click the control while it is disabled
* The DIV must not be focusable with the keyboard
* The DIV must not respond to hover
* The DIV must not respond to click visually - no changes to colour, border, etc

## How to complete the tutorial

### Set up & check the demo is working

1. Clone or download this repository
2. [Install NodeJS](https://nodejs.org/)
3. Open the repository in your CLI of choice (WSL or Terminal recommended, should also work in Powershell)
4. In the repo directory, run `npm install`
5. In the repo directory, run `npm run testdemo` to run the Playwright tests over the demo. These should all pass - this confirms your environment is set up and ready.
6. In the repo directory, run `npm run testdiv`. This runs the tests over the code you will be editing. All of these tests should fail at the start.
7. Now comes the main tutorial - follow the guide below and edit the files in `./source/`. Re-run `npm run testdiv` periodically to track your progress.

Available commands:

* `npm run testdiv` - run only the DIV tests. This is the command you need for most of the tutorial.
* `npm run test` - run all tests over your solution - this includes extra tests for the button and other elements.
* `npm run testdemo` - run all tests over the demo solution
* `npm run start` - run a local server with your solution
* `npm run startdemo` - run a local server with the demo solution

Note that you don't have to run the server to view the solution, you can just load the files directly in a browser:

* Your solution: `./source/index.html`
* Demo solution: `./demo/index.html`

### Troubleshooting setup

* You may need to take extra actions to make the Playwright tests run, but Playwright's messages will tell you what they are. eg. for WSL you will need to install some extra system packages, and the command to do so will be included in the log output.
* If all tests are passing all the time, check that you have not run the server with the demo solution. If in doubt, stop any server you are running and run `npm run testdiv`.
* Powershell may require you to grant network/firewall permission to run the server.

### Starting the tutorial

Run `npm run testdiv` - you should see a set of failed tests. The tutorial is fundamentally "make these tests pass". 

You will need to edit three files:

* `/source/index.html`
* `/source/index.css`
* `/source/index.js`

Look for `TUTORIAL` in each file for hints on where you need to edit. Re-run `npm testdiv` after each edit.

You don't have to run the server to work on the files, they can be loaded directly from your system drive.

## Guided process to complete the tutorial

Each heading corresponds to a test. The order of test results may vary from the order of the tutorial, but this does not change the results.

### Does the DIV accept click events and increment the counter?

Let's start with the basics - making the `div` do something. Since JavaScript isn't really the focus of this tutorial, find the `divCounter` function and uncomment the line that activates the counter. This should get your first test to pass as you can now click the `div` to increment the counter.

Note that the `div` is set up to call a function instead of just performing the action within the event listener. This is more code than the `button`, for reasons that will be apparent later.

### Has the DIV been set to the role of button?

Just because it acts like a button doesn't mean assisitive technology recognises it as a button. In the HTML you need to set the ARIA `role` to `button` so assistive technology know to treat the `div` element as though it was a `button`.

Background: [MDN: ARIA button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)

### Does the DIV's layout work the same as a button's layout?

You have probably noticed by now that the `div` is stretching to the full width of your solution, while the `button` shrinks to fit the text. This is because the default styles for the two elements are different: `div` is a block element, while `button` is an inline-block element.

So your CSS will need to set the `div` to `inline-block`. There are other ways to achieve the desired style but for this tutorial, the test expects the simplest option.

Background: [MDN: CSS display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

### Does the DIV prevent text selection?

If you click and drag your mouse on a `button`, the text will not be selected. But if you click and drag on a `div`, the text is selected as though it was general non-interactive text. You need to handle this in your CSS by setting `user-select: none;` on the `div`.

Background: [MDN: CSS user-select](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)

### Does the DIV get the correct cursor when you hover over it?

When you hover over a button, you see the `default` cursor (pointer), which indicates it is interactive. If you hover the `div`, you'll see the `text` cursor (I-beam) which indicates the text can be selected - but this `div` is meant to be a button, which should not be selected. You can fix this in your CSS with `cursor: default;`.

Background: [MDN: CSS cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)

### Is it possible to reach the DIV using the keyboard?

To activate a control with the keyboard, the user needs to be able to move focus onto that control. Open up your solution and hit the tab key a few times - you'll see focus move on to the default button, the styled button, but then it will skip to the checkbox that disables the controls.

This happens because `button`s are focusable elements, but `div`s are not. You need to add the `div` to the document's natural tab order, by adding a `tabindex` attribute.

You will also need to add focus styles to the `div` so you can tell when you have focused it. You can copy the styles from the `button` and update the selectors, as the tabindex will enable the `:focus` pseudoselector.

Background: [MDN: tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)

### Activating the div with the keyboard (multiple tests)

Tests:

* Does the DIV increment by hitting enter with keyboard focus? 
* Does the DIV increment by hitting spacebar with keyboard focus?
* Does the DIV *not* increment by hitting keys other than spacebar or enter?
* Can you move past the DIV in both directions, using tab and shift+tab?

Now that you can move focus to the `div`, you need to make it do something.

First, add a keypress listener (keydown would also work):
```js
$div.addEventListener('keypress', function (event) {
    divCounter(event);
});
```
...you can see now why the action was abstracted to a function. It lets you call it from multiple event listeners.

Now tab to the `div` and hit enter and spacebar - it should update the counter. Great!

...but now tab to the `div` and hit other keys like `a`, `s`, `d`, `f`... they're also incrementing the counter. Try hitting those keys on the `button` and you'll see it already ignores them. You need to filter keyboard events triggered on the `div`, so that only the `Enter` and `Space` keys increment the counter:

```js
$div.addEventListener('keypress', function (event) {
    if (event.code == "Enter" || event.code == "Space") {
        divCounter(event);
    }
});
```

If you are wondering about the test for TAB and SHIFT+TAB - it's unlikely that you will create the problem in this tutorial, but it is possible to 'trap' users on an element by stopping standard keystrokes like TAB and SHIFT+TAB. A similar type of bug can be introduced when they replicate an HTML element like SELECT, but don't match the normal behaviour like responding to cursor keys (up and down arrows). So if you are working on a custom component that replaces a native element, you need to create a detailed keyboard interaction specification to make sure it works as people will expect it to. 

Background:

* [MDN: keyboard accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Keyboard)
* [MDN: key event](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)

### Disabling the `div` (multiple tests)

Use the checkbox to toggle the disabled state of the controls.

Tests:

* When disabled, the DIV should not increment the counter if clicked
* Does the DIV expose its disabled state to assistive technology?

Disabling a `button` element is done by setting or removing the `disabled` attribute. You can see this being done within `$checkbox.onchange` for the two buttons. This doesn't work on `div` elements because `div`s don't support the `disabled` attribute.

You will have to handle this yourself by disabling the counter in your JavaScript, and since we are using a DOM scripting approach, that means you need to toggle something in the HTML. It is not recommended that you inject a `disabled` attribute as that's invalid. You could certainly use a class or a custom data attribute, but there is a better option. You can make use of the `aria-disabled` attribute, which allows strings of `true` and `false` - very useful for testing as well as accessibility.

Change you JavaScript to add `aria-disabled="true"` when the `div` should be disabled; and `aria-disabled="false"` when it should be enabled:

```js
$div.setAttribute('aria-disabled', 'false');
$div.setAttribute('aria-disabled', 'true');
```

It is important to understand that unlike `disabled`, `aria-disabled` does not disable any functionality - it only *tells assistive technology* that the element is or isn't meant to be disabled. So you need to put a check for into the `divCounter` function:

```js
function divCounter(event) {
    if (event.target.getAttribute('aria-disabled') != "true") {
        $divCounter.textContent = ++divCount;
    }
}
```

You can also add style by using the attribute selector:
```css
.divbutton[aria-disabled="true"] {}
.divbutton[aria-disabled="false"] {}
```

By attaching style and custom functionality to the ARIA attribute, it avoids the need for multiple DOM changes for the same state. It also makes it a little less likely that someone else will accidentally break accessibility by removing the ARIA attribute later.

Background:

* [MDN: disabled attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
* [MDN: aria-disabled attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

### Disabled DIV should not be focusable

Set the controls to disabled using the checkbox, and you'll find you cannot tab to the `button`s but you can still tab to the `div`. The tabindex you added earlier needs to be removed when it's disabled; and added back when enabled.

In a real-world scenario, handling this manually for every single instance of a button would be impractical, so the demo implementation uses `MutationObserver` to handle this generically for any instance of `div.divbutton`. But for the tutorial you can use a simpler solution and wire it up in `$checkbox.onchange`.

### Styling the DIV for focus states (multiple tests)

Tests:

* Does the DIV's focus style apply with keyboard focus?
* Does the DIV's focus style NOT apply with mouse focus (after click)?

When you tab to the `div`, you want to be able to see that you've done so. In this case we apply a custom visual style, with a 1px black outline.

Try applying this with `:focus`:
```css
.divbutton:focus {
  outline: 1px solid #000;
}
```
Tab to the button and all is well, you can see the outline! However we are not quite done. Try clicking the `div` and you'll see the focus outline remains after you've clicked it. Compare this with clicking the `button` - you'll see that mouse focus does not activate the outline. This is a very common complaint during design reviews - keyboard styles applying during mouse interaction.

In the past this required custom JavaScript to sniff for user input and apply styles accordingly, 

Thankfully now that IE11 has been retires, we can use a new CSS pseudo-class that applies focus styles based on the user's input modality - `:focus-visible`:
```css
.divbutton:focus-visible {
  outline: 1px solid #000;
}
```

Background:

* [MDN CSS :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
* [caniuse :focus-visible](https://caniuse.com/css-focus-visible)

### Styling the DIV for hover states (multiple tests)

Tests:

* When enabled, DIV should apply hover style
* When disabled, the DIV should not apply hover style

Similar to focus, you need to be careful about applying custom hover states. Disabled buttons should not hover, after all.

Tey applying this style:

```css
.divbutton:hover {
  background: #eee;
}
```
...then try hovering the button while it is disabled. The hover style still applies even when the `div` is disabled and shouldn't be reacting. If you have trouble seeing the style change, set the background to a darker colour.

To avoid applying custom style to a disabled element, you need to scope it to the enabled state. On a `button` you can do this by adding the `:enabled` pseudo selector:
```css
.fancybutton:enabled:hover {
  background: #eee;
}
```
You can also achieve this with a `:not()`:
```css
.fancybutton:not(:disabled):hover {
  background: #eee;
}
```
But the only real reason to mention this format is to help explain the `div`'s required code:

```css
.divbutton[aria-disabled="false"]:hover {
  background: #eee;
}
```
The `div` can't use the normal pseudo selector, so you need to use the `aria-disabled` attribute added earlier with JavaScript. Be sure to set this to `#eee` so test will pass.

Background:

* [MDN CSS :enabled](https://developer.mozilla.org/en-US/docs/Web/CSS/:enabled)
* [MDN CSS :disabled](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled)
* [MDN CSS :not](https://developer.mozilla.org/en-US/docs/Web/CSS/:not)


### Styling the DIV for active states (multiple tests)

Tests:

* When enabled, DIV should apply active style
* When disabled, DIV should not apply active style

Active states need to be scoped the same way as hover states. 


## Conclusion

Through this tutorial you've been able to replicate `button` functionality on a `div`. However you should also have noticed it took significantly more steps, and more code, than the `button` element required for the same result.

In the version I presented at A11y Camp, I calcuated the DIV required four extra attributes in the HTML; and 57 extra lines of CSS and JS. To put it another way, the `div` required more than five times as much code as the `button`.

The specific challenges will vary in real-world situations, and some UI frameworks now do a better job of bridging the gaps. When you encounter custom elements based on generics like `div` and `span`, you should now have a good idea where to start testing them for accessibility. Or, you may be able to swap them over to use a more appropriate HTML element. 

