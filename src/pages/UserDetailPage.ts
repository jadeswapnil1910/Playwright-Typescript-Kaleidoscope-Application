import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../utils/basePage";
import { faker } from '@faker-js/faker';
import user from '../data/userData.json';

export class UserDeatilPage extends BasePage {

    readonly page: Page;
    private readonly $pageTitle: Locator;
    private readonly $streetAddressTextBox: Locator;
    private readonly $stateTextBox: Locator;
    private readonly $stateOption: Locator;
    private readonly $cityTextBox: Locator;
    private readonly $zipCodeTextBox: Locator;
    private readonly $countryTextBox: Locator;
    private readonly $countryOption: Locator;
    private readonly $nextPageButton: Locator;

    constructor(page: Page) {
        
        super(page);
        this.page = page;
        this.$pageTitle = this.page.getByTestId('page-title');
        this.$streetAddressTextBox = this.page.getByRole('textbox', { name: 'Street Address', exact: true });
        this.$stateTextBox = this.page.getByRole('textbox', { name: 'State (Full)' });
        this.$stateOption = this.page.getByRole('option', { name: 'California' });
        this.$cityTextBox = this.page.getByRole('textbox', { name: 'City' });
        this.$zipCodeTextBox = this.page.getByRole('textbox', { name: 'Zip Code' });
        this.$countryTextBox = this.page.getByRole('textbox', { name: 'Country' });
        this.$countryOption = this.page.getByText('United States of America');
        this.$nextPageButton = this.page.getByRole('button', { name: 'Next Page' });
        
    }

    async fillUserDetails1() {

        // User Detail Page
        await this.page.waitForLoadState();
        await this.page.waitForLoadState('domcontentloaded');
        await this.$textBoxFill(this.$streetAddressTextBox, user.address.street);
        await this.$clickElement(this.$stateTextBox);
        await this.$clickElement(this.$stateOption);
        await this.$textBoxFill(this.$cityTextBox, user.address.city);
        await this.$textBoxFill(this.$zipCodeTextBox, user.address.zip);
        await this.$clickElement(this.$countryTextBox);
        await this.$clickElement(this.$countryOption);
        await this.$clickElement(this.$nextPageButton);

        if(await this.page.locator('role="alert"').isVisible()){
            await this.page.reload();
            await this.page.waitForLoadState();
            await this.page.waitForLoadState('domcontentloaded');
            await this.$textBoxFill(this.$streetAddressTextBox, user.address.street);
            await this.$clickElement(this.$stateTextBox);
            await this.$clickElement(this.$stateOption);
            await this.$textBoxFill(this.$cityTextBox, user.address.city);
            await this.$textBoxFill(this.$zipCodeTextBox, user.address.zip);
            await this.$clickElement(this.$countryTextBox);
            await this.$clickElement(this.$countryOption);
            await this.$clickElement(this.$nextPageButton);
        }
        await this.page.waitForLoadState('domcontentloaded');
        
    }

    async fillUserDetails() {
        // Helper function to fill user details
        const fillDetails = async () => {
            await this.$textBoxFill(this.$streetAddressTextBox, user.address.street);
            await this.$clickElement(this.$stateTextBox);
            await this.$clickElement(this.$stateOption);
            await this.$textBoxFill(this.$cityTextBox, user.address.city);
            await this.$textBoxFill(this.$zipCodeTextBox, user.address.zip);
            await this.$clickElement(this.$countryTextBox);
            await this.$clickElement(this.$countryOption);
            await this.$clickElement(this.$nextPageButton);
        };
    
        // Initial page load and fill details
        await this.page.waitForLoadState('domcontentloaded');
        await fillDetails();
    
        // Handle alert and retry if necessary
        const bool = await this.page.locator('[role="alert"]').filter({ hasText: 'Fail' }).isVisible();
        if (bool) {
            await this.page.reload();
            await this.page.waitForLoadState('domcontentloaded');
            await fillDetails();
        }
    
        // Final wait to ensure the page is fully loaded
        await this.page.waitForLoadState('domcontentloaded');
    }

    
}