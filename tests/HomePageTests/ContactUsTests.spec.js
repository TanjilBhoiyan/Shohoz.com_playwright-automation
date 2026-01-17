import {test,expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ContactUs } from '../pages/ContactUsPage';
//import { HomePageBus } from '../pages/HomePageBus';

test.describe.configure({mode:'serial'});

test.describe('',()=>{
    /**@type {ContactUs} */
    let contactus;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('01918531609','Tanjil123@#?');

        contactus = new ContactUs(page);
    })
    test('Verify try to submit contact us information without Name Field',async ({page})=>{
        await contactus.contactUsButton().click();
        await contactus.purposeOfVehicle('Air');
        await contactus.yourName('');
        await contactus.phoneNumber('01918531610');
        await expect(page.getByText('The name field is required.')).toBeVisible();
        await expect(page.getByText('Send')).toBeVisible();
    })
    test('Verify try to submit contact us information without Phone Number',async ({page})=>{
        await contactus.contactUsButton().click();
        await contactus.purposeOfVehicle('Air');
        await contactus.phoneNumber('');
        await contactus.yourName('Test name');
        await expect(page.getByText('The phone number field is required.')).toBeVisible();
        await expect(page.getByText('Send')).toBeVisible();
    })
    test('Verify try to submit contact us information without Email Field',async ({page})=>{
        await contactus.contactUsButton().click();
        await contactus.purposeOfVehicle('Air');
        await (await contactus.email()).fill('');
        await contactus.yourName('Test name');
        await expect(page.getByText('The email field is required.')).toBeVisible();
        await expect(page.getByText('Send')).toBeVisible();
    })
    test('Verify try to submit contact us information without Message Field',async ({page})=>{
        await contactus.contactUsButton().click();
        await contactus.purposeOfVehicle('Air');
        await contactus.message('');
        await contactus.yourName('Test name');
        await expect(page.getByText('The message field is required.')).toBeVisible();
        await expect(page.getByText('Send')).toBeVisible();
    })
    test('Verify successfully submit contact us information',async ({page})=>{
        await contactus.contactUsButton().click();
        await contactus.purposeOfVehicle('Air');
        await contactus.yourName('Test name');
        await contactus.yourCity('Dhaka');
        await contactus.phoneNumber('01918531610');
        await (await contactus.email()).fill('test@gmail.com');
        await contactus.message('This is a automatic message');
        await contactus.sendButton();
        await contactus.sendButton();
        await expect(page.getByText('Your query is noted. We will get back to you soon.')).toBeVisible();
    })
    
    
})
// npx playwright test tests/ContactUsTests.spec.js --project chromium --headed