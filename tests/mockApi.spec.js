const {expect,test} = require("@playwright/test")


test("Mocking api call", async({page})=>{
    

    await page.route("https://randomuser.me/api/",async(route)=>{
        const mockResponse = {
            results : [
                {
                    name:{
                        first : "JHON",
                        last:"DOE"
                    }
                }
            ]
        }

        await route.fulfill({
            contentType: "application/json",
            body: JSON.stringify(mockResponse)
        })
    })


    // intercepting the request data


    page.on("response",response=>{
        if(response.url().includes("randomuser.me/api/")){
            response.body().then(body=>{
                const responseData = JSON.parse(body)
                console.log(responseData);
                expect(responseData.results[0].name.first).toBe("JHON")
                expect(responseData.results[0].name.last).toBe("DOE")
            })
        }
    })


    await page.goto("http://127.0.0.1:5500/apiCall.html")

    await page.click("#btn")


    const userData = await page.locator("p")

    await expect(userData).toHaveText(`The new user name is JHON`)

})