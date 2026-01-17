import {test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AirTicketSearch } from '../../pages/AirPages/AirTicketSearchPage';

test.describe.configure({mode:'serial'});

// test.describe('Home page tests',()=>{
//     /** @type {TrainTicketSearchPage} */
//     let trainTicketSearchPage;
//     test.beforeEach(async ({page})=>{
//         const login = new LoginPage(page);
//         await login.gotoLoginPage();
//         await login.login('01918531609','Tanjil123@#?');

//         trainTicketSearchPage = new TrainTicketSearchPage(page);
//     })
// })