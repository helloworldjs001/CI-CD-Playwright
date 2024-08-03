const {expect,test} = require("@playwright/test")

test("css selector - select by class and id", async({page})=>{

    await page.goto("http://127.0.0.1:5500/demoPage.html")


    // by id and class combination

    const firstPara = await page.locator(".info#first-paragraph")

    await expect(firstPara).toHaveText("This is the first paragraph.")



    // by id selector
    // const homelink = await page.locator("#home-link")

    // await expect(homelink).toHaveText("Go to Home")


    // const containerDiv = await page.locator(".container")

    // await expect(containerDiv).toHaveCSS("background-color", "#fff)");
})

test("css selector", async({page})=>{

    await page.goto("http://127.0.0.1:5500/demoPage.html")



    const containerDiv = await page.locator(".container")

    await expect(containerDiv).toHaveCSS("background-color", "rgb(255, 255, 255)");
})

test("id selector", async({page})=>{

    await page.goto("http://127.0.0.1:5500/demoPage.html")



    // by id selector
    const homelink = await page.locator("#home-link")

    await expect(homelink).toHaveText("Go to Home")
})




test("ss", async({page})=>{


    await page.goto("https://www.google.com/")


    const ssPath = "ss/google.png"

    // await page.screenshot({ path: ssPath , fullPage: true});


    await expect(page).toHaveScreenshot("ss-1-actual.png")



})