export class ContactUs{
    constructor(page){
        this.page = page;
        this.contactusButtonLocator = '//a[@class="text-base font-bold text-center text-primary-black w-44 h-16 rounded-2xl bg-white hover:bg-gray-100 transition-colors flex justify-center items-center cursor-pointer"]';
        this.purposeLocator='//select[@id="purpose"]';
        this.vehicleOptionLocator='//select[@id="purpose"]/option';
        this.yourNameLocator='//input[@id="name"]';
        this.yourCityLocator='//select[@id="city"]';
        this.phoneNumberLocator='//input[@id="phone_number"]';
        this.emailLocator='//input[@id="email"]';
        this.messageLocator='//textarea[@id="comment"]';
        this.sendButtonLocator='//button[normalize-space()="Send"]';
        this.confirmationmessageLocator='//div[@class="p-6 border border-green-400 rounded bg-green-100 text-green-700 text-xl"]'
    }
    async confirmationmessage(){
        await this.page.locator(this.confirmationmessage);
    }
    async sendButton(){
        await this.page.locator(this.sendButtonLocator).click();
    }
    async message(message){
        await this.page.locator(this.messageLocator).fill(message);
    }
    async email(){
        await this.page.waitForTimeout(1000);
        return this.page.locator(this.emailLocator);
    }
    async phoneNumber(phone_number){
        await this.page.locator(this.phoneNumberLocator).fill(phone_number);
    }
    async yourCity(your_city){
        await this.page.waitForTimeout(1000);
        await this.page.selectOption(this.yourCityLocator , {lebel: your_city});
    }
    async yourName(your_name){
        await this.page.locator(this.yourNameLocator).fill(your_name);
    }
    contactUsButton(){
        return this.page.locator(this.contactusButtonLocator);
    }
    async purposeOfVehicle(purpose_Of_vehicle) {
            await this.page.selectOption(this.purposeLocator, {label: purpose_Of_vehicle});
    }

    // async purposeOfvehicle(purpose_Of_vehicle){
    //     await this.page.locator(this.purposeLocator).click();
    //     await this.page.waitForTimeout(2000);

    //     const options = await this.page.locator(this.vehicleOptionLocator);

    //     for(let option of options){
    //         const vehicle = await option.textContent();
    //         console.log(vehicle);
    //         if(vehicle.includes(purpose_Of_vehicle)){
    //             //await option.waitFor({ state: 'visible' });
    //             await option.click();
    //             break;
    //         }
    //     }
    // }
}