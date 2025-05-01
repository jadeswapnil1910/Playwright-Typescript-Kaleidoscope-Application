import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../utils/BasePage";
import { faker } from '@faker-js/faker';
import user from '../data/userData.json';

export class UserDetailPage extends BasePage {

    readonly page: Page;
    private readonly streetAddressTextBox: Locator;
    private readonly stateTextBox: Locator;
    private readonly stateOption: Locator;
    private readonly cityTextBox: Locator;
    private readonly zipCodeTextBox: Locator;
    private readonly countryTextBox: Locator;
    private readonly countryOption: Locator;

    constructor(page: Page) {
        
        super(page);
        this.page = page;
        this.streetAddressTextBox = this.page.getByPlaceholder('Enter your street address');
        this.stateTextBox = this.page.getByRole('textbox', { name: 'State (Full)' });
        this.stateOption = this.page.getByRole('option', { name: 'California' });
        this.cityTextBox = this.page.getByRole('textbox', { name: 'City' });
        this.zipCodeTextBox = this.page.getByRole('textbox', { name: 'Zip Code' });
        this.countryTextBox = this.page.getByRole('textbox', { name: 'Country' });
        this.countryOption = this.page.getByText('United States of America');
    }

    async fillUserDetails1() {

        // User Detail Page
        await this.page.waitForLoadState();
        await this.page.waitForLoadState('domcontentloaded');
        await this.textBoxFill(this.streetAddressTextBox, user.address.street);
        await this.clickElement(this.stateTextBox);
        await this.clickElement(this.stateOption);
        await this.textBoxFill(this.cityTextBox, user.address.city);
        await this.textBoxFill(this.zipCodeTextBox, user.address.zip);
        await this.clickElement(this.countryTextBox);
        await this.clickElement(this.countryOption);
        await this.clickNextPageButton();

        if(await this.page.getByRole("alert").isVisible()){
            await this.page.reload();
            await this.page.waitForLoadState();
            await this.page.waitForLoadState('domcontentloaded');
            await this.textBoxFill(this.streetAddressTextBox, user.address.street);
            await this.clickElement(this.stateTextBox);
            await this.clickElement(this.stateOption);
            await this.textBoxFill(this.cityTextBox, user.address.city);
            await this.textBoxFill(this.zipCodeTextBox, user.address.zip);
            await this.clickElement(this.countryTextBox);
            await this.clickElement(this.countryOption);
            await this.clickNextPageButton();
        }
        await this.page.waitForLoadState('domcontentloaded');
        
    }

    async fillUserDetails() {
        // Helper function to fill user details
        const fillDetails = async () => {
            await this.textBoxFill(this.streetAddressTextBox, user.address.street);
            await this.clickElement(this.stateTextBox);
            await this.clickElement(this.stateOption);
            await this.textBoxFill(this.cityTextBox, user.address.city);
            await this.textBoxFill(this.zipCodeTextBox, user.address.zip);
            await this.clickElement(this.countryTextBox);
            await this.clickElement(this.countryOption);
            await this.clickNextPageButton();
        };
    
        // Initial page load and fill details
        await this.page.waitForLoadState('domcontentloaded');
        await fillDetails();
    
        // Handle alert and retry if necessary
        const bool = await this.page.getByRole('alert').filter({ hasText: 'Failed to save' }).isVisible();
        if (bool) {
            await this.page.reload();
            await this.page.waitForLoadState('domcontentloaded');
            await fillDetails();
        }
    
        // Final wait to ensure the page is fully loaded
        await this.page.waitForLoadState('domcontentloaded');
    }

    
}