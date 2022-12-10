
# INCOMPLETE

This tutorial is not ready to go yet.

To do:

* test in powershell
* test on Mac
* get the layout test working with actual widths
* finish step-through docs

# Button vs. Div

This is a test-driven tutorial designed to teach you all the things HTML `button` elements actually do, by replicating their functionality on a `div` element using HTML, CSS and JavaScript. Note that in production, you really should just use a `button` - but after this you'll understand why!

The tutorial runs through a modified version of the build I described at A11y Camp 2019, in my talk "Clickable DIVs and Other Icebergs" (you can view the talk at: https://www.youtube.com/watch?v=VxoiHb4aqXg). The main difference is that this tutorial applies a mild custom design to both elements.

## The tutorial task

The task is to make the DIV look, feel and work the same as a BUTTON. You confirm this by making the end-to-end test suite pass. There is a detailed specification and it's recommended you deal with it one test at a time. If you get stuck, there is a demo implementation that passes all the tests... but try to complete your build without looking at it.

## The specification

Behaviour:

* Clicking the DIV must increment the counter
* You must be able to put focus on the DIV by hitting the TAB key and move back off with SHIFT+TAB
* You must be able to increment the counter by pressing ENTER or SPACEBAR while the DIV has focus
* When you hover over the DIV, the mouse cursor should look the same as when you hover a BUTTON
* If you click and drag on the button, the text should not select

Style:

* The DIV must look the same as the BUTTON in all states; including resting state, focus, hover, active, clicked and disabled
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
2. Install NodeJS (https://nodejs.org/en/)
3. Open the repository in your CLI of choice (WSL or Terminal recommended)
4. In the repo directory, run `npm install`
5. In the repo directory, run `npm testdemo` to run the Playwright tests over the demo. These should all pass - this confirms your environment is set up and ready.

### Available commands

* `npm run testdiv` - run only the DIV tests. This is the command you need for most of the tutorial.
* `npm run test` - run all tests over your solution - this includes extra tests for the button and other elements.
* `npm run testdemo` - run all tests over the demo solution
* `npm run start` - run a local server with your solution
* `npm run startdemo` - run a local server with the demo solution

Note that you don't have to run the server to view the solution, you can just load the files directly in a browser:

* Your solution: `./source/index.html`
* Demo solution: `./demo/index.html`



### The tutorial

Run `npm testdiv` - should see a set of failed tests.

The tutorial is fundamentally "make these tests pass". Try to do this just from the description of the tests, but if you're stuck the detailed test reports will give you hints on what to do.

You will need to edit three files:
`/source/index.html`
`/source/index.css`
`/source/index.js`

Look for `TUTORIAL` in each file for hints on where you need to edit. Re-run `npm test` after each edit.

Since this isn't a JavaScript tutorial, the very basic functionality of 

You don't have to run the server to work on the files, they can be loaded directly from your hard drive. The tests do run in the server, so don't have the server running when you run the tests.

#### Does the DIV accept click events and increment the counter?

This is the basic functionality. Since JavaScript isn't really the focus of this tutorial, find the `divCounter` function and uncomment the line that activates the counter. This should get your first test to pass.

#### Does the DIV increment by hitting enter with keyboard focus? & Does the DIV increment by hitting spacebar with keyboard focus?

You now need to add events to handle the enter and spacebar key as well as mouse clicks. When adding the event listener, remember that you can't disable the tab key so you will need to specify which keystrokes to respond to.

Bacgkround: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

#### Is it possible to reach the DIV using the keyboard?

By default `buttons` are focusable elements, but `div`s are not. You need to add the `div` to the document's natual tab order.

Background: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex


#### Can you move past the DIV in both directions, using tab and shift+tab?

This should be resolved if you have made the `div` respond to the keyboard, but only if Space or Enter is pressed.

#### Has the DIV been set to the role of button?

#### Does the DIV expose its disabled state to assistive technology?




When disabled, the DIV should not increment the counter if clicked
Disabled DIV should not be focusable ==============
Does the DIV's layout work the same as a button's layout?
Does the DIV get the correct cursor when you hover over it?
Does the DIV prevent text selection? ==============

## Troubleshooting

* You may need to take extra actions to make the Playwright tests run, but Playwright's messages will tell you what they are. eg. for WSL you will need to install some extra system packages.
* If all tests are passing all the time, check that you have not run the server with the demo solution. If in doubt, stop any server you are running and run `npm run testdiv`.
