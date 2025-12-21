export class HomePage{


    constructor(page){
        this.page = page;
        //this.oneWayRadioButtonLocator='button.btn-trip-type:has-text("One Way")';
        this.oneWayRadioCheckBoxLocator='button.btn-trip-type:has-text("One Way")';
        //this.roundWayRadioButtonLocation='//button[normalize-space()="Round Way"]';
        this.returnDateAddButtonLocator='button[class="return-trip-btn uppercase text-some-orange"]';
        this.roundWayCheckBoxLocator= '//button[normalize-space()="Round Way"]';
        //this.ReturnDateTextLocator ='p[class="label !font-bold"]';
        this.journeyDatePickLocator='#doj';
        this.returnDatePickLocator='#dor';
        this.fromLocationInputLocator = '#fromcity';
        this.toLocationInputLocator='#tocity';
        // use dynamic locator for date seletion
        //const targetDate = '24'; 
        //this.selectJourneydateLocator = `(//div[@class='btn-light'][normalize-space()='${targetDate}'])[1]`;
        this.searchButtonLocator='button[type="submit"]';
    }
    searchbutton(){
        //this.page.waitForLoadState('load');
        return this.page.locator(this.searchButtonLocator);
    }
    async selectjourneydate(journey_date){
        await this.page.locator(`(//div[@class='btn-light'][normalize-space()='${journey_date}'])[1]`).click();
    }

    onewayradiocheckbox(){
        return this.page.locator(this.oneWayRadioCheckBoxLocator);
    }
    roundwayradiocheckbox(){
        return this.page.locator(this.roundWayCheckBoxLocator);
    }
    returndateaddbutton(){
        return this.page.locator(this.returnDateAddButtonLocator);
    }
    async returndatepick(){
        return this.page.locator(this.returnDatePickLocator);
    }
    async fromlocationinput(starting_area){
        await this.page.locator(this.fromLocationInputLocator).type(starting_area);

        await this.page.waitForSelector("//span[contains(text(),'Dhaka')]");
        const fromCityOptions = await this.page.$$("//span[contains(text(),'Dhaka')]");
        for(let option of fromCityOptions){
            const value = await option.textContent();
            //console.log(value);
            if(value.includes('Dhaka')){
                await option.click();
                break;
            }
        }
    }
    async tolocationinput(destination_area){
        await this.page.locator(this.toLocationInputLocator).type(destination_area);
        await this.page.waitForSelector("//label[@for='tocity']//button");
        const toCityOptions = await this.page.$$("//label[@for='tocity']//button");
        for(let option of toCityOptions){
            const value = await option.textContent();
            //console.log(value);
            if(value.includes('Sylhet')){
                await option.click();
                break;
            }
        }
    }
}