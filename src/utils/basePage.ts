import { Locator, Page, expect } from "@playwright/test";

export default class BasePage {

    readonly page: Page;
    private readonly $nextBtn: Locator;
    private readonly $submitBtn: Locator;
    private readonly $saveBtn: Locator;
    private readonly $nextpgBtn: Locator;

    constructor(page: Page) {
        
        this.page = page;
        this.$nextBtn   = this.page.getByRole('button', { name: 'Next' });
        this.$submitBtn = this.page.getByRole('button', { name: 'Submit' });
        this.$saveBtn   = this.page.getByRole('button', { name: 'Save' });
        this.$nextpgBtn = this.page.getByRole('button', { name: 'Next Page' });
    }

    // Common Method to navigate to Element
    async $navigateTo(url: string) {

        await this.page.goto(url);
    }

    // Common method to click an element
    async $clickElement(element: Locator) {

        // await this.page.waitForLoadState('domcontentloaded');
        await element.click();
        await this.page.waitForTimeout(500);
    }

    // Common method to fill out a form field
    async $textBoxFill(element: Locator, value: string) {
        await element.fill(value);
        await this.page.waitForTimeout(500);
    }
 
    // Common method to retrieve text from an element
    async $getElementText(element: Locator): Promise<string> {
        return element.innerText();
    }
 
    // Common method to wait for an element to be visible
    async $waitForElementVisible(element: Locator | string) {
        if (typeof element === 'string') {
            await this.page.waitForSelector(element, { state: 'visible' });
        } else {
            await element.waitFor({ state: 'visible' });
        }
    }
 
    // Common method to wait for an element to be hidden
    async $waitForElementHidden(element: Locator) {
        if (typeof element === 'string') {
            await this.page.waitForSelector(element, { state: 'hidden' });
        } else {
            await element.waitFor({ state: 'hidden' });
        }
    }
 
    // Common method to take a screenshot
    async $takeScreenshot(fileName: string) {
        await this.page.screenshot({ path: fileName });
    }

    // Common Next Button Click Action
    async $clickNextButton() {

        await this.$clickElement(this.$nextBtn);
        await this.page.waitForTimeout(2000);
    }

    // Common Next Page Button Click Action
    async $clickNextPageButton() {

        await this.$waitForElementVisible(this.$nextpgBtn);
        await this.$clickElement(this.$nextpgBtn);
        await this.page.waitForLoadState();
    }

    // Common Submit Button Click Action
    async $clickSubmitButton() {

        await this.$clickElement(this.$submitBtn);
        await this.page.waitForTimeout(2000);
    }

    // Common Submit Button Click Action
    async $clickSaveButton() {
        
        await this.$clickElement(this.$saveBtn);
        await this.page.waitForTimeout(2000);
        await expect(this.page.getByText('Application saved').last()).toBeVisible();
        await this.page.locator('div[role="alert"] button').click();
    }

    async $expectToContainText(locator: Locator, text: string) {
        await this.page.waitForTimeout(2000);
        await expect(locator).toContainText(text);
    }
}