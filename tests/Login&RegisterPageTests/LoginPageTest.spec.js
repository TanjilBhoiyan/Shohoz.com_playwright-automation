import { test , expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe.configure({mode:'serial'});
// Login
test.describe('Login Tests',()=>{
    /** @type {LoginPage} */
    let login;
    test.beforeEach(async ({page})=>{
        login = new LoginPage(page);
        await login.gotoLoginPage();
    })
    test('Login test using Valid mobile number and valid password', async ({ page })=>{
        await login.login('01918531609','Tanjil123@#?');
    })
    test('Login test using Valid mobile number and Invalid password' , async ({page})=> {
        await login.login('01918531609','thisiswrongPassword');
        // Assertion: Error message visible
        await expect(page.getByText('Invalid Mobile Number Or Password')).toBeVisible();
    })
    test('Login test using Invalid mobile number and Invalid password' , async ({page})=> {
        await login.login('01918531610','thisiswrongPassword')
        // Assertion: Error message visible
        await expect(page.getByText(/invalid credentials|The mobile number is not registered/i)).toBeVisible();
    })
    test('Login test using Invalid mobile number and Valid password' , async ({page})=> {
        await login.login('01918531515','Tanjil123@#?')
        // Assertion: Error message visible
        await expect(page.getByText(/invalid credentials|The mobile number is not registered/i)).toBeVisible();
    })
    test('Login test using which number is not Registered yet' , async ({page})=> {
        await login.login('01918531610','Tanjil123@#?')
        // Assertion: Error message visible
        await expect(page.getByText('The mobile number is not registered')).toBeVisible();
    })
    test('Try to login using less than 11 digit mobile number',async ({page})=>{
        await login.loginlink();
        await login.mobilenumber('0191853161');
        await page.waitForTimeout(1000);

        // Assertion: Error message visible
        await expect(page.getByText('Please enter a valid mobile number (e.g., 01xxxxxxxxx).')).toBeVisible();
        await expect(await login.loginbutton()).toBeDisabled();
    })
    test('Check Login in button is visible or not without password',async ({page})=>{
        await login.loginlink();
        await login.mobilenumber('01918531609');
        //await expect(page.getByText('Password is required.')).toBeVisible();
        await expect(await login.loginbutton()).toBeDisabled();
    })
    test('Check the error for using less than 8 characters password',async ({page})=>{
        await login.loginlink();
        await login.mobilenumber('01918531609');
        await login.userpassword('acfabn');

        await expect(page.getByText('Password must be at least 8 characters.')).toBeVisible();
        await expect(await login.loginbutton()).toBeDisabled();
    })
})







