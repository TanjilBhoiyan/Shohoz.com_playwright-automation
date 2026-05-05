import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/Login&RegisterPage/LoginPage';
//import { HomePageBus } from '../pages/HomePageBus';
import { HomePageBus } from '../../pages/BusPages/HomePageBus';


test.describe.configure({mode:'serial'});

test.describe('Home page tests',()=>{
    /** @type {HomePageBus} */
    let homepagebus;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('01918531609','Tanjil123@#?');

        homepagebus = new HomePageBus(page);
    })
    test('If selected One Way should showing "add return date" button', async ({page})=>{
        await expect(await homepagebus.oneWayRadioCheckBox()).toHaveClass(/radio-selected/);
        const className = await homepagebus.oneWayRadioCheckBox().getAttribute('class');
        //console.log('Class:', className);
        const isSelected = className.includes('radio-selected');
        console.log('Is selected:', isSelected);

        if(isSelected){
            await expect(homepagebus.returnDateAddButton()).toBeVisible();
        }
        else {
            console.log('Return date button is not visible visible');
            await expect(await homepagebus.returnDateAddButton()).toBeDisabled();
        }
    })
    test('If selected Round Way Showing Return date option',async ({page})=>{
        //const homepage = new HomePage(page);
        await homepagebus.roundWayRadioCheckBox().click();
        await expect(page.getByText('Return Date', { exact: true })).toBeVisible();
        await expect(await homepagebus.returnDatePick()).toBeVisible();
    })
    test('Verify the available Bus Search' , async ({page})=>{
        await homepagebus.fromLocationInput('Dhaka');
        await homepagebus.toLocationInput('Sylhet');
        await homepagebus.selectJourneyDate('26');
        await homepagebus.searchButton().click();
        await expect(page.locator('.result-container.flex.justify-between.items-start.pt-5.px-0.py-12.trips-area-placeholder')).toBeVisible();
    })
    test('Verify From input field after click on start a new search',async({page})=>{
        await homepagebus.fromLocationInput('Dhaka');
        await homepagebus.toLocationInput('Sylhet');
        await homepagebus.selectJourneyDate('26');
        await homepagebus.searchButton().click();
        await homepagebus.shohozLogo().click();
        await homepagebus.startNewSearch().click();
        await expect(await homepagebus.frominput()).toBeFocused();
    })
})
// npx playwright test tests/HomePageBusTests.spec.js --project chromium --headed