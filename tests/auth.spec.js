const {test,expect} = require("@playwright/test")




test.describe("Auth Tests",()=>{

    test.beforeEach(async({page})=>{
        await page.goto("http://127.0.0.1:8080/login.html")
    })


    test("should login successfully",async({page})=>{

        await page.fill("#username","user")
        await page.fill("#password","pass")
        await page.click("button[type='submit']")

        await expect(page.locator("#message")).toHaveText("Login successful!")

        const cookies = await page.context().cookies()

        const authCookie = cookies.find(cookie => cookie.name === "authToken")

        expect(authCookie).toBeTruthy()

        expect(authCookie.value).toBe("validToken")

    })


    test("handle failed login",async({page})=>{

        await page.fill("#username","useasdsadr")
        await page.fill("#password","asdsad")
        await page.click("button[type='submit']")

        await expect(page.locator("#message")).toHaveText("Invalid credentials")

    })


    test("reuse cookie",async({browser})=>{

        // first context

        const context1 = await browser.newContext()

        const page1 = await context1.newPage()


        await page1.goto("http://127.0.0.1:8080/login.html")

        await page1.fill("#username","user")
        await page1.fill("#password","pass")
        await page1.click("button[type='submit']")


        await expect(page1.locator("#message")).toHaveText("Login successful!")


        // extract the cookie

        const cookies = await context1.cookies()

        await context1.close()

        // create a new context

        const context2 = await browser.newContext()
        await context2.addCookies(cookies)

        const page2 = await context2.newPage()

        await page2.goto("http://127.0.0.1:8080/login.html")

        await expect(page2.locator("#message")).toHaveText("Login successful!")

    })

    


})