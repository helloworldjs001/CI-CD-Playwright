const {chromium,firefox} = require("playwright")


const automation = async(browserType)=>{

    const browser = await browserType.launch({headless:false})

    const context = await browser.newContext()

    const page = await context.newPage()

    await page.goto("https://example.com")

    console.log("the page title on : ",browserType.name(),await page.title());

    await browser.close()

}

automation(chromium)
automation(firefox)
