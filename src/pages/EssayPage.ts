import { Locator, Page } from "@playwright/test";
import BasePage from "../utils/basePage";

export class EssayPage extends BasePage {

    readonly page: Page;
    private readonly $pageTitle: Locator;
    private readonly $carsCheckbox: Locator;
    private readonly $animalsCheckbox: Locator;
    private readonly $schoolCheckbox: Locator;
    private readonly $otherCheckbox: Locator;
    private readonly $animalsTextbox: Locator;
    private readonly $schoolTextbox: Locator;

    constructor(page: Page) {
        
        super(page);
        this.page = page;
        // Initialize locators
        this.$pageTitle = this.page.getByTestId('page-title');
        this.$carsCheckbox = this.page.getByRole('checkbox', { name: 'Cars' });
        this.$animalsCheckbox = this.page.getByRole('checkbox', { name: 'Animals' });
        this.$schoolCheckbox = this.page.getByRole('checkbox', { name: 'School' });
        this.$otherCheckbox = this.page.getByRole('checkbox', { name: 'Other' });
        this.$animalsTextbox = this.page.getByRole('textbox', { name: 'Essay about Animals' });
        this.$schoolTextbox = this.page.getByRole('textbox', { name: 'Essay about School' });
    }

    async essayPgActions() {
        // Verify page title
        await this.$expectToContainText(this.$pageTitle, 'Essay');

        // Perform checkbox and essay actions
        await this.checkAndUncheckCheckbox(this.$carsCheckbox, 'Essay about Cars *');
        await this.checkAndUncheckCheckbox(this.$animalsCheckbox, 'Essay about Animals *');
        await this.checkAndUncheckCheckbox(this.$schoolCheckbox, 'Essay about School *');
        await this.checkAndUncheckCheckbox(this.$otherCheckbox, 'Provide an essay about any');

        // Recheck specific checkboxes
        await this.$clickElement(this.$animalsCheckbox);
        await this.$clickElement(this.$schoolCheckbox);

        // Fill essay textboxes
        await this.fillEssayTextbox(this.$animalsTextbox, 'Animal Essay TextBox');
        await this.fillEssayTextbox(this.$schoolTextbox, 'School Essay TextBox');
        await this.page.waitForTimeout(2000);

    }

        // Function to check and uncheck a checkbox and click associated text
    private async checkAndUncheckCheckbox(checkbox: Locator, textToClick: string) {
        await this.$clickElement(checkbox);
        await this.$clickElement(this.page.getByText(textToClick));
        await checkbox.uncheck();
    }

    // Function to fill an essay textbox
    private async fillEssayTextbox(textbox: Locator, value: string) {
        await this.$clickElement(textbox);
        await this.$textBoxFill(textbox, value);
        await this.page.waitForTimeout(1000);
    }
}