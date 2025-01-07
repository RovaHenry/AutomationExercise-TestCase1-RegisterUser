const {Builder} = require('selenium-webdriver');
const RegisterPage = require ('./WebComponent/RegisterPage');
const DashboardPage = require ('./WebComponent/DashboardPage');
const FormRegisPage = require ('./WebComponent/FormRegisPage');
const DeleteAccount = require ('./WebComponent/DeleteAccount');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;
const username = process.env.USERNAME;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 1 [Register] #Regression', function(){
    this.timeout(50000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            // options.addArguments('--headless');
        break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const dashboardTitle = await dashboardPage.verifyFeaturesItemsHeader();
        assert.strictEqual(dashboardTitle, 'FEATURES ITEMS','We are not in dashboard page');   
    });

    //test Suite dimulai dengan apa, setiap melakukan tes
    it('Register new account and verify we in register page', async function () {
        const registerPage = new RegisterPage(driver);
        await registerPage.registerButton();
        const signUpTitle = await registerPage.verifySignUpHeader();
        assert.strictEqual(signUpTitle, 'New User Signup!', 'We are not in register page');
        await registerPage.register(username, email);
    });

    it('Filling form register', async function () {
        const formRegister = new FormRegisPage(driver);
        const enterAccHeader = await formRegister.verifyEnterAccHeader();
        assert.strictEqual(enterAccHeader, 'ENTER ACCOUNT INFORMATION', 'We are not in form register page');
        await formRegister.selectMr();
        await formRegister.newsletter();
        await formRegister.specialOffer();
        await formRegister.fillForm(password);
        await formRegister.create();
        const accCreated = await formRegister.verifyAccCreated();
        assert.strictEqual(accCreated, 'ACCOUNT CREATED!', 'Account not created');
        await formRegister.driver.findElement(formRegister.continue).click();
        const loginAsUser = await formRegister.verifyUserLogin();
        assert.strictEqual(loginAsUser, 'Logged in as ROVA HENRYAWAN', 'Username is not "Rova Henryawan"');
    });
    it('Deleting account: Rova Henryawan', async function () {
        const deleteAcc = new DeleteAccount(driver);
        await deleteAcc.deleteAcc();
        const accDeleted = await deleteAcc.verifyAccDeleted();
        assert.strictEqual(accDeleted, 'ACCOUNT DELETED!', 'Account is not deleted');
        await deleteAcc.continueBtn();
    });

    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});