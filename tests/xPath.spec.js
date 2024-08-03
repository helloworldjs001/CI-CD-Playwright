const {expect,test} = require("@playwright/test")


test("test using xpath",async({page})=>{


    await page.goto("http://127.0.0.1:5500/demoPage.html")
    

    const aboutLink = await page.locator("//html/body/div/a[2]")

    await expect(aboutLink).toBeVisible()


})


test("test using xpath v2",async({page})=>{


    await page.goto("http://127.0.0.1:5500/demoPage.html")
    

    const secondPara = await page.locator('//*[@id="second-paragraph"]')

    await expect(secondPara).toHaveText(/asdsad/)


})