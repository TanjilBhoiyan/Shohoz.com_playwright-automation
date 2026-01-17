export class HomePageBus{
    constructor(page){
        this.page = page;
        this.airButtonLocator='//span[@class="text-xs font-semibold text-right ml-1.5"][normalize-space()="Air"]';
        this.trainButtonLocator='//span[@class="text-xs font-semibold text-right ml-1.5"][normalize-space()="Train"]';
        this.launchButtonLocator='//span[@class="text-xs font-semibold text-right ml-1.5"][normalize-space()="Launch"]';
        this.eventButtonLocator='//span[@class="text-xs font-semibold text-right ml-1.5"][normalize-space()="Event"]';
        this.airButtonLocator='//span[@class="text-xs font-semibold text-right ml-1.5"][normalize-space()="Park"]';

        this.oneWayRadioCheckBoxLocator='button.btn-trip-type:has-text("One Way")';
        this.returnDateAddButtonLocator='button[class="return-trip-btn uppercase text-some-orange"]';
        this.roundWayCheckBoxLocator= '//button[normalize-space()="Round Way"]';
        this.journeyDatePickLocator='#doj';
        this.returnDatePickLocator='#dor';
        this.fromLocationInputLocator = '#fromcity';
        this.toLocationInputLocator='#tocity';
        this.searchButtonLocator='button[type="submit"]';
        this.startNewSearchLocator='(//*[name()="svg"][@class="w-6 h-6 text-gray-600"])[1]';
        this.shohozLogoLocator='img[alt="Logo"]';

 
    }
    async fromLocationInput(starting_area){
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
    async toLocationInput(destination_area){
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
    async trainButton(){
        await this.page.locator(this.trainButtonLocator).click();
    }


    frominput(){
        return this.page.locator(this.fromLocationInputLocator);
    }
    shohozLogo(){
        return this.page.locator(this.shohozLogoLocator);
    }
    startNewSearch(){
        return this.page.locator(this.startNewSearchLocator);
    }
    searchButton(){
        return this.page.locator(this.searchButtonLocator);
    }
    async selectJourneyDate(journey_date){
        await this.page.locator(`(//div[@class='btn-light'][normalize-space()='${journey_date}'])[1]`).click();
    }
    oneWayRadioCheckBox(){
        return this.page.locator(this.oneWayRadioCheckBoxLocator);
    }
    roundWayRadioCheckBox(){
        return this.page.locator(this.roundWayCheckBoxLocator);
    }
    returnDateAddButton(){
        return this.page.locator(this.returnDateAddButtonLocator);
    }
    async returnDatePick(){
        return this.page.locator(this.returnDatePickLocator);
    }

}