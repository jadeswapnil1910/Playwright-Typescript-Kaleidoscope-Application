import { Locator, Page, expect } from "@playwright/test";

export default class BasePage {

    readonly page: Page;
    private readonly nextButton: Locator;
    private readonly submitButton: Locator;
    private readonly saveButton: Locator;
    private readonly nextPageButton: Locator;

    constructor(page: Page) {
        
        this.page = page;
        this.nextButton   = this.page.getByRole('button', { name: 'Next' });
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.saveButton   = this.page.getByRole('button', { name: 'Save' });
        this.nextPageButton = this.page.getByRole('button', { name: 'Next Page' });
    }

    // Common Method to navigate to Element
    async navigateTo(url: string) {

        await this.page.goto(url);
    }

    // Common method to click an element
    async clickElement(element: Locator) {

        await element.click();
        await this.page.waitForTimeout(500);
    }

    // Common method to fill out a form field
    async textBoxFill(element: Locator, value: string) {

        await element.fill(value);
        await this.page.waitForTimeout(500);
    }
 
    // Common method to retrieve text from an element
    async getElementText(element: Locator): Promise<string> {

        return element.innerText();
    }
 
    // Common method to wait for an element to be visible
    async waitForElementVisible(element: Locator | string) {

        if (typeof element === 'string') {
            await this.page.waitForSelector(element, { state: 'visible' });
        } else {
            await element.waitFor({ state: 'visible' });
        }
    }
 
    // Common method to wait for an element to be hidden
    async waitForElementHidden(element: Locator) {

        if (typeof element === 'string') {
            await this.page.waitForSelector(element, { state: 'hidden' });
        } else {
            await element.waitFor({ state: 'hidden' });
        }
    }
 
    // Common method to take a screenshot
    async takeScreenshot(fileName: string) {
        
        await this.page.screenshot({ path: fileName });
    }

    // Common Next Button Click Action
    async clickNextButton() {

        await this.clickElement(this.nextButton);
        await this.page.waitForTimeout(2000);
    }

    // Common Next Page Button Click Action
    async clickNextPageButton() {

        await this.waitForElementVisible(this.nextPageButton);
        await this.clickElement(this.nextPageButton);
        await this.page.waitForLoadState();
    }

    // Common Submit Button Click Action
    async clickSubmitButton() {

        await this.clickElement(this.submitButton);
        await this.page.waitForTimeout(2000);
    }

    // Common Save Button Click Action
    async clickSaveButton() {
        
        await this.clickElement(this.saveButton);
        await this.page.waitForTimeout(2000);
        await expect(this.page.getByText('Application saved').last()).toBeVisible();
        await this.page.getByRole('alert').getByRole('button').click();
    }

    async expectToContainText(locator: Locator, text: string) {
        await this.page.waitForTimeout(2000);
        await expect(locator).toContainText(text);
    }
}