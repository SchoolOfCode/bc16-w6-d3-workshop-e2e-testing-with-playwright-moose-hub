import { test, expect } from "@playwright/test";

const url = "http://localhost:5432/"


test("Testing user flow of todo page", async ({ page }) => {
    // load page
    await page.goto(url);
    // load page content
    const pageContent = await page.content();
    console.log("Page Content:", pageContent);

    // create pageHeader locator and wait for it to be visible 
    const pageHeading = await page.getByRole("heading", { name: "Todo List App" });
    await expect(pageHeading).toBeVisible();

    // create locator for todo input field and add todo button
    const todoInput = await page.getByRole("textbox", { name: "New Todo:" });
    const todoAddBtn = await page.getByRole("button", { name: "Add" });

    // fill input field and click button to create new todo task
    const newTodoText = "Complete playwright workshop";
    await todoInput.fill(newTodoText);
    await expect(todoInput).toHaveValue(newTodoText);
    await todoAddBtn.click();


    // create locator for new todo task and check visible
    let newTodoTask = await page.getByRole("checkbox", {name: newTodoText}).first();
    await expect(newTodoTask).toBeVisible();

    // refresh the page to check new todo task
    await page.reload();
    newTodoTask = await page.getByRole("checkbox", {name: newTodoText}).first();
    await expect(newTodoTask).toBeVisible();
    await expect(newTodoTask).not.toBeChecked();


    // check new todolist task to mark as completed
    await newTodoTask.check();
    await Promise.all([
        page.waitForResponse(response => 
            response.url().includes('/api/todos/') && 
            response.status() === 200 && 
            response.request().method() === 'PUT'
        ),
        newTodoTask.check(), // This action triggers the PUT request
    ]);
    await expect(newTodoTask).toBeChecked({ timeout: 10000 });
    

    // refresh page to check new todo task is completed
    await page.reload();
    newTodoTask = await page.getByRole("checkbox", {name: newTodoText}).first();
    await expect(newTodoTask).toBeChecked({ timeout: 10000 });
  });

// SKELETON TEST
// test("Go to home page", async ({ page }) => {
//     await page.goto(url);

    // const todoInput = await page.getByRole("textbox", { name: "New Todo:" });
    // const todoAddBtn = await page.getByRole("button", { name: "Add" });

    // const newTodoText = "Complete playwright workshop";

    // await todoInput.fill(newTodoText);
    // await expect(todoInput).toHaveValue(newTodoText);

    // // await todoAddBtn.click();
// })