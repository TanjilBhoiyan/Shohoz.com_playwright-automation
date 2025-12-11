exports.LoginPage = class LoginPage {

    constructor(page){
        this.page = page;
        this.loginLinkLocator = '.login-link.ng-star-inserted';
        this.mobileNumberInputLocator = '#mobile_number';
        this.passwordInputLocator = '#password'
        this.loginButtonLocator = '//button[normalize-space()="Log In"]';
    }

    async gotoLoginPage(){
        await this.page.goto('https://www.shohoz.com/');
    }

    async login(user_mobileNumber,user_password){
        await this.page.locator(this.loginLinkLocator).click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.mobileNumberInputLocator, { state: 'visible' });
        await this.page.locator(this.mobileNumberInputLocator).fill(user_mobileNumber);
        await this.page.locator(this.passwordInputLocator).fill(user_password);
        await this.page.locator(this.loginButtonLocator).click();
    }

    async loginlink(){
        await this.page.locator(this.loginLinkLocator).click();
        await this.page.waitForTimeout(1000);
    }
    async mobilenumber(user_mobilenumber){
        await this.page.locator(this.mobileNumberInputLocator).fill(user_mobilenumber);
    }
    async userpassword(user_password){
        await this.page.locator(this.passwordInputLocator).fill(user_password);
    }
    async loginbutton(){
        return this.page.locator(this.loginButtonLocator);
    }

}
// npx playwright test tests/LoginPageTest.spec.js --project chromium --headed