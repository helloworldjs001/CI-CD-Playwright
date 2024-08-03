const {expect,test} = require("@playwright/test")


// test("selection using text selection", async({page})=>{

//     await page.goto("http://127.0.0.1:5500/demoPage.html")

//     const heading = await page.locator("text='Welcome to Basic Testing'")

//     await expect(heading).toBeVisible()

// })




// test("selection using attributes", async({page})=>{

//     await page.goto("http://127.0.0.1:5500/demoPage.html")

//     const contactMail = await page.locator("[href='mailto:info@example.com']")

//     await expect(contactMail).toBeVisible()

// })


test("counter",async({page})=>{


    await page.goto("http://127.0.0.1:5500/demoPage.html")


    const incrementBtn = await page.locator("#add")
    const decrementBtn = await page.locator("#sub")

    const display = await page.locator(".display")

    await expect(display).toHaveText("0")

    await incrementBtn.click()

    await expect(display).toHaveText("1")

    await decrementBtn.click()
    await decrementBtn.click()

    await expect(display).toHaveText("-1")




})

