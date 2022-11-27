
# INCOMPLETE

This tutorial is not ready to go yet.

To do:
split the solved version out from the unsolved
finish docs
test on PC
test on Mac

# Button vs. Div

This tutorial walks you through all the things you need to do to make a DIV work like a BUTTON.

There is a detailed specification so it's recommended you deal with it one line at a time. There are some traps in there!

If you're really stuck, mostly the tests will give strong hints about what to do. But you should try to work it out yourself.


## The high level specification

When making a DIV behave like a BUTTON, you need to replicate all the behavious and accessibility features of the BUTTON. These are quite extensive, going far beyond adding a click event.

For the purposes of this tutorial, a mild style has been applied; as that's a realistic scenario. The visual styles can simply be copied from the button, but you'll quickly realise that the selectors don't match the HTML you have to use on the DIV.

## The detailed specification

Functionality:

* Clicking the DIV must increment the counter
* You must be able to put focus on the DIV by hitting the TAB key
* You must be able to increment the counter by pressing ENTER or SPACEBAR while the DIV has focus
* When you hover over the DIV, the mouse cursor should look the same as when you hover a BUTTON
* The DIV's layout must work like the button (ie. not be full width)
* If you click and drag on the button, the text should not select

Style:

* The DIV must look the same as the BUTTON in all states; including resting state, focus, hover, active, clicked and disabled
* In addition to the visual treatment, the layout of the DIV be the same as - it should only be as wide as the text requires

Additional requirements when disabled:

* The DIV must not be focusable with the keyboard
* The DIV must not respond to hover
* The DIV must not respond to click, visually or functionally
* The DIV must look the same as the disabled BUTTON

## How to complete the tutorial

1. Clone or download the repo
2. Install NodeJS
3. In the repo, run `npm install`
4. In the repo, run `npm test` to run the Playwright tests. Many of the tests will fail when you first run them.

The tutorial is to update the HTML, CSS and JS to make the tests pass (or to meet all the requirements listed above, if you prefer to think of it that way).

There are some things you cannot change, or the tests will never pass. The tests require the page to have exactly four controls, in order:

1. The unstyled button
2. The styled button
3. The div-as-button
4. Checkbox to enable or disable the others

Also the tests require the exact IDs to be maintained. 

So basically leave the tags as they are, and only change attributes (other than ID).

## Troubleshooting

* You may need to take extra actions to make Playwright run, but Playwright's messages will tell you what they are.
