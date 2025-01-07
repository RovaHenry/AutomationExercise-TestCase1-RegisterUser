const {By} = require('selenium-webdriver');

class DeleteAccount {
    constructor(driver) {
        this.driver = driver;
        this.deleteButton = By.xpath("//a[contains(.,'Delete Account')]");
        this.deleteHeader = By.xpath("//b[.='Account Deleted!']");
        this.continue = By.xpath("//a[.='Continue']");
    }
    async deleteAcc(){
        await this.driver.findElement(this.deleteButton).click();
    }
    async verifyAccDeleted(){
        const title = await this.driver.findElement(this.deleteHeader).getText();
        return title;
    }
    async continueBtn(){
        await this.driver.findElement(this.continue).click();
    }
}

module.exports = DeleteAccount;