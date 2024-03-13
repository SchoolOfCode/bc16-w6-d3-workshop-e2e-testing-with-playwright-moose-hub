# Playwright

End-to-end tests validate an entire app from start to finish, like a real user would experience. These tests simulate user flows across the whole integrated system - frontend, backend, database. Unlike unit how tests focus on small pieces, end-to-end tests exercise the entire app together. This catches issues that only happen when all parts are combined.

In this workshop, we'll learn end-to-end testing with Playwright. Playwright makes it easy to automate and test real browser interactions with the UI and functionality of web apps. We'll use Playwright to write scripts that simulate user flows. This will test our app fully from end-to-end.

## 💡 OBJECTIVES FOR THE WORKSHOP

This workshop is all about end-to-end testing! Here's a glimpse of what you'll be achieving by the end of this workshop:

- How to use Playwright locators to find elements on the page (whilst considering accessibility)
- How to simulate user interactions (e.g. clicking a button) with Playwright
- How to write and run end-to-end tests

## 🎟️ TICKETS

In this workshop, you'll be writing end-to-end tests for a full-stack application. Time to dive into action! 🏊‍♂️ Here's what you'll be working on:

### 🎫 Ticket 1 - Setup and familiarity

Get familiar with the codebase and running the application.

1. Take time to review the codebase structure and functionality:

   - Examine the frontend code (in the `public` folder) to understand how the UI works and is rendered.
   - Look through the backend API routes (in the `todos` folder) to see how data is handled.
   - Check the database schema and seed data (in the `db` folder) to see how information is stored.
   - To deepen your understanding of any complex parts of the code, feel free to copy snippets into ChatGPT or other AI assistants and ask them to explain what the code is doing. Use their explanations of the syntax and logic to strengthen your own knowledge.

2. Set up a database server so you have a connection URL.
3. Create a `.env` file in the root of the project and add a `DATABASE_URL` environment variable set to your connection URL and optionally a `PORT` variable. See `.env.example` for reference.
4. Install dependencies with `npm install`.
5. Initialise the database by running `npm run reset-db`. This will create the necessary tables with necessary data.
6. Start the app with `npm run dev`. This launches the Express server which handles the API and serves the frontend.
7. Open the URL printed in the terminal in your browser. You should see the todo app frontend. Play with it from a user's perspective.
8. Now that you're familiar with the code and running the app, you're ready to begin the testing tasks!

### 🎫 Ticket 2 - Installing Playwright

First, use the [installation instructions](https://playwright.dev/docs/intro) to install Playwright within the project.

- During the installation process, you can interact with the options using arrow keys and the Enter key on your keyboard.
- If it asks you about using TypeScript or JavaScript, choose JavaScript.
- If it asks you where to put your end-to-end tests, choose `tests` (this is the folder where it'll place your tests).
- If it asks you whether to add a GitHub Actions workflow, choose no.
- If it asks you whether to install Playwright browsers, choose yes.
- If it creates some example tests for you (in the `tests` and `tests-examples` folder), feel free to read through them and have tools like ChatGPT explain what the code is doing (if you're curious) but then ultimately delete them so that you've only got an empty `tests` folder and are ready to start fresh.
- It it asks whether to override the existing `playwright.config.js` file, choose no.

Then read through the [Writing Tests](https://playwright.dev/docs/writing-tests) page to get an overview of how tests are written in Playwright.

### 🎫 Ticket 3 - Writing a basic test skeleton

At this stage you should have a `playwright.config.js` and an empty `tests` folder. Your next task is to write the minimum amount of code needed to create and run a Playwright test.

- Create a `todos.test.js` file within the `tests` folder.
  - Why: This creates a file within which you can put your tests. Ending the file with `test.js` lets Playwright know that this JavaScript file contains tests for it to run.
- Inside the `todos.test.js` file, import `test` from `@playwright/test`
  - Why: `test` is a function located within the Playwright package. It allows you to define test cases.
  - If you're stuck on how to import `test` from Playwright, look for examples online or in their documentation.
- Call `test` to define a new test named `"practice test should pass"` that doesn't do anything yet.

  - Why: Calling `test()` with correct arguments registers a new test.
  - If you're stuck on how to use/call `test`, look for examples online or in the Playwright documentation.
  - After writing your test, use the Playwright documentation (https://playwright.dev/docs/running-tests might be a good starting point) to figure out how to run Playwright and see whether it detects and passes your new test.
    - Why: This lets you know if Playwright is detecting your test file and the test within it. By default, tests pass and only fail if something went wrong or didn't meet your expectations.
    - Playwright launches browsers and then automates the browser as per the logic in the test. By default, this can all happen without it being visible to you and instead you just see the outcome in the terminal. This is useful when running the tests in most automated contexts where there isn't a human/developer launching the tests. However, during development and writing test, if you prefer to see the browser (and a UI for Playwright itself), have a look at Playwright's [UI mode](https://playwright.dev/docs/test-ui-mode).

🎯 Knowing how to read and write this sort of test skeleton is going to be a fundamental part of this exercise. Typically you'll have test files containing multiple tests, with each test building on top of this skeleton/structure.

### 🎫 Ticket 4 - Navigating to the frontend

When writing end-to-end tests, being able to navigate to a particular URL is an important step. In order to test the application, you've got to navigate to it first.

If you're not already running the Express app from earlier, start it up with `npm run dev`. Keep it running and make sure you can access the frontend in a browser using the URL logged in the terminal.

- Why: Playwright by default won't start up your web application for you. So you need to ensure your application is running first before running your tests. If you run the tests without starting up the web application first, the tests won't be able to access the frontend and the tests would fail.

Create a new, separate terminal and if needed, `cd` to the root of this project. This second terminal can be used for Playwright commands and running the tests.

Within the existing test that you've started, use the [Playwright documentation](https://playwright.dev/docs/writing-tests#navigation) to programmatically navigate to the URL that the frontend is running on.

You should then rerun the tests to check whether navigation was successful and the test still passes. If you're using Playwright's UI mode to run the tests (as mentioned in the previous ticket), you can check if you can see the frontend for the todos web application in the Playwright UI.

### 🎫 Ticket 5 - Locating the input element

Finding elements on the page is a fundamental part of writing end-to-end tests. This is because in order to perform actions (e.g. clicking a button or typing something into an input) or assertions (e.g. checking if an input contains some expected value), you need to find the element first.

Locators are how you find elements on the page in Playwright. Although there are many different ways to create locators, the Playwright documentation recommends using the [getByRole](https://playwright.dev/docs/locators#locate-by-role) for accessibility reasons. You typically want to avoid finding elements in ways that aren't visible to users (for example, HTML attributes, classnames, tags). These approaches can be a bit more brittle (as the test may need rewriting if the implementation changes). You generally want to test the application in the same way a user or assistive technologies (like screen readers) would perceive and use it.

The todos web application displays an input element, which allows the user to enter a new todo. Within the existing test that you've started, your task is to use the [locators documentation](https://playwright.dev/docs/locators) to create a locator for the input element (preferably using either `getByRole` or `getByLabel`).

If you choose to use `getByRole`:

- From an accessibility perspective, input elements implicitly have a `textbox` role and the input's label text forms its accessible name. This information is useful when using the `getByRole` locator.
- For more information on elements' roles and names, try a resource like: https://russmaxdesign.github.io/html-elements-names/.

The created locator doesn't find or store the element, it only stores how to find the element. In order to actually find the element during the test, you need to use the locator with an assertion or action, which is what you'll do in the next ticket.

Rerun the tests to make sure they still pass.

### 🎫 Ticket 6 - Simulating user interactions

Now that you've created a locator for the input, your next task is to programmatically fill in the input. Filling in an input is an example of the many different actions you can perform programmatically. Here's a list of some common user interactions you may need to simulate when writing a test with Playwright: https://playwright.dev/docs/writing-tests#basic-actions.

Within the existing test that you've started, your task is to use the Playwright documentation to programmatically fill in the input during the test with a todo of your choosing. (An example todo could be "Wash the car".)

Once done, rerun the test to ensure it still passes. If you're using UI mode, you should be able to see the input being filled with the text you've chosen.

### 🎫 Ticket 7 - Assertions

There's one more fundamental concept you need to cover: assertions. Assertions are a way for you to programmatically check whether a condition or value is as you expect during the test. Tests are typically incomplete until assertions are added.

Playwright provides an `expect` function which can be used to create assertions. You can import `expect` into your test file in order to use it. Here are a list of common assertions that Playwright supports: https://playwright.dev/docs/writing-tests#assertions.

Within the existing test that you've started, your task is to add an assertion that the input's value is the todo text that you added in the previous ticket.

Once done, rerun the test to ensure it still passes with the new assertion.

### 🎫 Ticket 8 - Testing a user flow

You've now covered writing a test skeleton, navigating, locators, actions and assertions. It's time to put these concepts together and explore some new ones. Write an end to end test for the following flow. A user should be able to:

1. navigate to the web application
2. see the "Todo List App" heading
3. enter a todo into the input with the "New Todo:" label
4. click on the "Add" button to clear the input and add the todo to the list
5. see the newly created todo in the list with an unchecked box and delete button next to it
6. refresh the page and still see their todo in the list
7. mark the todo as completed by ticking its checkbox
8. refresh the page and still see their todo in the list and ticked
9. mark the todo as incomplete by unticking its checkbox
10. refresh the page and still see their todo in the list and unticked
11. delete the todo by clicking the red delete button
12. no longer see their todo in the list
13. refresh the page and still not see their todo in the list

An example plan for this user flow is provided below. It uses `getByRole` and accessible roles, but you don't have to do things this way or use the plan.

```js
// import test and expect from Playwright
//    why:
//      test will be needed to register tests
//      expect will be needed to create assertions
// write a test skeleton
//    name of test can be something like "user should be able to manage todos"
// run tests to make sure new test is detected by Playwright and passes
// inside the test itself:
//    navigate to the frontend URL
//
//    find the "Todo List App" heading
//      why: in order to assert the heading is on the page, you first need to specify how to find it
//      create a locator for the heading
//        accessible role = heading, accessible name = "Todo List App"
//    use the locator for the heading to assert that the heading is visible
//
//    find the input with the "New Todo:" label:
//      why: in order to enter a todo into the input, you need to specify how to find it first.
//      create a locator for the input using getByRole
//        accessible role = textbox, accessible name = "New Todo:"
//    assert that the input's value is empty to begin with
//    fill in the input's value with "Wash the dog"
//    assert that the input's value is now "Wash the dog"
//
//    find the add button and click on it:
//      create a locator for the button using getByRole
//        accessible role = button, accessible name = "Add"
//      click on the button
//    assert that the input's value is now empty
//
//    find the newly added todo in the list:
//      look up the accessible role and name for a list item
//      create a locator for the specific todo using getByRole. use the Playwright documentation and examples online where needed.
//    assert that the newly added todo is visible in the list using the locator
//
//    refresh the page:
//      search Playwright documentation and online to find out how to do this
//      it may be helpful to look at the methods on the page object
//    again assert that the newly added todo is visible in the list using the locator
//      why: this assertion adds confidence that the newly added todo is persisted (even after the page refresh)
//
//    find the checkbox for the newly added todo:
//        look up the accessible role and name for a checkbox
//        create a locator using getByRole for the checkbox that corresponds to the newly added todo
//    assert that the checkbox is visible
//    assert that the checkbox is unchecked initially
//    tick the checkbox using the locator
//    assert that the checkbox is checked now
//    refresh the page
//    again assert that the checkbox is checked now
//      why: this assertion adds confidence that changes to the todo are persisted (even after the page refresh)
//    untick the checkbox using the locator
//    assert that the checkbox is unchecked now using the locator
//    refresh the page
//    again assert that the checkbox is unchecked now
//      why: this assertion adds confidence that changes to the todo are persisted (even after the page refresh)
//
//    find the delete button for the todo:
//        create a locator for the delete button using getByRole, its accessible role and accessible name
//    assert that the delete button is visible using the locator
//    click the delete button using the locator
//    assert that the todo is no longer in the list
//    refresh the page
//    again assert that the todo is no longer in the list using its locator
//      why: this assertion adds confidence that deletions are persisted
//
//    rerun the test to ensure it passes
```

There's a lot to plan and implement here. It can be useful to rerun the tests regularly whilst implementing the test (and not just once at the end), just to get early feedback.

### 🎫 Ticket 9 - Making it easier

You've just discovered there's some great capability in Playwright that is a game-changer for quickly creating tests that mimic user flows... Recording actions and generating flows.

[Install the VSCode extension](https://learn.schoolofcode.co.uk/path-player?courseid=qa&unit=65f0c7abdbf72a524801d336Unit), and [follow this guide](https://learn.schoolofcode.co.uk/path-player?courseid=qa&unit=65f0c19bea784a90ce0af707Unit) to recreate what you did through manually coding the user flow but this time use the recording and code generation features. Make sure you test things out and try and understand how to do things efficiently, like make assertions from within the recording tool, etc.

### 🎫 Ticket 10 - Extending and testing

You've now written an end-to-end test that adds confidence that the full-stack todos app allows users to manage their todos and persists their changes. You've even found a more effective and efficient way to do that with Playwright's recording and code generation ability.

Feel free to review your progress so far and revisit any of the earlier tickets. Once you've done that, your next task is to plan, build and test a new feature for this todos app.

Some ideas, although feel free to come up with your own instead:

- Input validation
- Different types of input
- Allow users to update each todo's text
- More todo details e.g. priority
- Error handling when fetching data from the API and checking if the response is ok or not
- ... and more!
