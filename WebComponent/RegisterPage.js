const {By} = require('selenium-webdriver');

class RegisterPage {
    constructor(driver) {
        this.driver = driver;
        this.registerMenu = By.css("[href='/login']");
        this.usernameInput = By.css("[name='name']");
        this.emailInput = By.css("[data-qa='signup-email']");
        this.signupInput = By.css("[data-qa='signup-button']");
        this.signUpHeader = By.css(".signup-form > h2");
    }

    async registerButton() {
        await this.driver.findElement(this.registerMenu).click();
    }

    async register(username, email) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.emailInput).sendKeys(email);
        await this.driver.findElement(this.signupInput).click();
    }

    async verifySignUpHeader() {
        const title = await this.driver.findElement(this.signUpHeader).getText();
        return title;
    }
}

module.exports = RegisterPage;