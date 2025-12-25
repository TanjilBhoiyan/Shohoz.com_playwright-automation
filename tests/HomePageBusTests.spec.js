import { test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePageBus } from '../pages/HomePageBus';


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
        //const homepage = new HomePage(page);
        await expect(await homepagebus.onewayradiocheckbox()).toHaveClass(/radio-selected/);
        const className = await homepagebus.onewayradiocheckbox().getAttribute('class');
        //console.log('Class:', className);
        const isSelected = className.includes('radio-selected');
        console.log('Is selected:', isSelected);

        if(isSelected){
            await expect(homepagebus.returndateaddbutton()).toBeVisible();
        }
        else {
            console.log('Return date button is not visible visible');
            await expect(await homepagebus.returndateaddbutton()).toBeDisabled();
        }
    })
    test('If selected Round Way Showing Return date option',async ({page})=>{
        //const homepage = new HomePage(page);
        await homepagebus.roundwayradiocheckbox().click();
        await expect(page.getByText('Return Date', { exact: true })).toBeVisible();
        await expect(await homepagebus.returndatepick()).toBeVisible();
    })
    test('Verify the available Bus Search' , async ({page})=>{
        await homepagebus.fromlocationinput('Dhaka');
        await homepagebus.tolocationinput('Sylhet');
        await homepagebus.selectjourneydate('26');
        await homepagebus.searchbutton().click();
        await expect(page.locator('.result-container.flex.justify-between.items-start.pt-5.px-0.py-12.trips-area-placeholder')).toBeVisible();
    })
    test('Verify From input field after click on start a new search',async({page})=>{
        await homepagebus.fromlocationinput('Dhaka');
        await homepagebus.tolocationinput('Sylhet');
        await homepagebus.selectjourneydate('26');
        await homepagebus.searchbutton().click();
        await homepagebus.shohozlogo().click();
        await homepagebus.startnewsearch().click();
        await expect(await homepagebus.frominput()).toBeFocused();
    })
})
// npx playwright test tests/HomePageBusTests.spec.js --project chromium --headed