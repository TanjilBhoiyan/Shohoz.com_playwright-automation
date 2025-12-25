import {test,expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
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
        await contactus.contactusbutton().click();
        await contactus.purposeOfvehicle('Air');
        await (await contactus.yourname()).fill('');
        await (await contactus.phonenumber()).fill('01918531610');
        await expect(page.getByText('The name field is required.')).toBeVisible();
        await expect(page.getByText('Send')).toBeVisible();
    })
    test('Verify try to submit contact us information without Phone Number',async ({page})=>{
        await contactus.contactusbutton().click();
        await contactus.purposeOfvehicle('Air');
        await (await contactus.phonenumber()).fill('');
        await (await contactus.yourname()).fill('Test name');
        await expect(page.getByText('The phone number field is required.')).toBeVisible();
        await expect(page.getByText('Send')).toBeVisible();
    })
    test('Verify try to submit contact us information without Email Field',async ({page})=>{
        await contactus.contactusbutton().click();
        await contactus.purposeOfvehicle('Air');
        await (await contactus.email()).fill('');
        await (await contactus.yourname()).fill('Test name');
        await expect(page.getByText('The email field is required.')).toBeVisible();
        await expect(page.getByText('Send')).toBeVisible();
    })
    test.only('Verify try to submit contact us information without Message Field',async ({page})=>{
        await contactus.contactusbutton().click();
        await contactus.purposeOfvehicle('Air');
        await (await contactus.message()).fill('');
        await (await contactus.yourname()).fill('Test name');
        await expect(page.getByText('The message field is required.')).toBeVisible();
        await expect(page.getByText('Send')).toBeVisible();
    })
    test('Verify successfully submit contact us information',async ({page})=>{
        await contactus.contactusbutton().click();
        await contactus.purposeOfvehicle('Air');
        await (await contactus.yourname()).fill('Test name');
        await contactus.yourcity('Dhaka');
        await (await contactus.phonenumber()).fill('01918531610');
        await (await contactus.email()).fill('test@gmail.com');
        await (await contactus.message()).fill('This is a automatic message');
        await contactus.sendbutton();
        await contactus.sendbutton();
        await expect(page.getByText('Your query is noted. We will get back to you soon.')).toBeVisible();
    })
    
    
})
// npx playwright test tests/ContactUsTests.spec.js --project chromium --headed