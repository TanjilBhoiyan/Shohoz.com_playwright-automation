import {test , expect } from '@playwright/test';
//import { LoginPage } from '../../pages/LoginPage';
import { LoginPage } from '../../pages/Login&RegisterPage/LoginPage';
//import { HomePageBus } from '../../pages/HomePageBus';
import { HomePageBus } from '../../pages/BusPages/HomePageBus';
import { TrainTicketSearchPage } from '../../pages/TrainPages/TrainTicketSearchPage';



test.describe.configure({mode:'serial'});

test.describe('Train page tests',()=>{
    /** @type {HomePageBus} */
    let homepagebus;
    /** @type {TrainTicketSearchPage} */
    let trainTicketSearchPage;
    test.beforeEach(async ({page})=>{
        //const { chromium } = require('playwright-extra');
        //const stealthPlugin = require('puppeteer-extra-plugin-stealth');
        //const login = new LoginPage(page);
        //homepagebus = new HomePageBus(page);
        trainTicketSearchPage = new TrainTicketSearchPage(page);
        //await login.gotoLoginPage();
        //await login.login('01918531609','Tanjil123@#?');
        //await homepagebus.trainButton();
        await page.goto('https://train.shohoz.com/');
        await trainTicketSearchPage.iAgree();
        await trainTicketSearchPage.bangladeshRailwayLogin('01918531609','Tanjil123@#?');
    })
    test('da',async({page})=>{
        //await homepagebus.trainButton();
    })
})

// npx playwright test tests/TrainTicketSearchTests.spec.js --project chromium --headed