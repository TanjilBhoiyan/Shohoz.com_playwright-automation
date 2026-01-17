export class TrainTicketSearchPage{
    constructor(page){
        this.page = page;
        //this.trainButtonLocator='//span[@class="text-xs font-semibold text-right ml-1.5"][normalize-space()="Train"]';
        this.agree='//button[normalize-space()="I AGREE"]';
        this.bRloginButtonLocator='(//span[@class="nav-text ng-tns-c37-0"][normalize-space()="Login"])[1]'
        this.bRLoginMobileNumberLocator='//input[@id="mobile_number"]';
        this.bRLoginPasswordLocator='//input[@id="password"]';
        this.bRSubmitButtonLocator='//button[@type="submit"]';
        
    }
    async bangladeshRailwayLogin(mobile_number,password){
        await this.page.locator(this.bRloginButtonLocator).click();
        await this.page.locator(this.bRLoginMobileNumberLocator).fill(mobile_number);
        await this.page.locator(this.bRLoginPasswordLocator).fill(password);
        await this.page.locator(this.bRSubmitButtonLocator).click();
    }
    async iAgree(){
        await this.page.locator(this.agree).click();
    }
}