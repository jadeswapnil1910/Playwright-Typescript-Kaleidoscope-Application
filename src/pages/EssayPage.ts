import { Locator, Page } from "@playwright/test";
import BasePage from "../utils/BasePage";

export class EssayPage extends BasePage {

    readonly page: Page;
    private readonly pageTitle: Locator;
    private readonly carsCheckbox: Locator;
    private readonly animalsCheckbox: Locator;
    private readonly schoolCheckbox: Locator;
    private readonly otherCheckbox: Locator;
    private readonly animalsTextbox: Locator;
    private readonly schoolTextbox: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageTitle = this.page.getByTestId('page-title');
        this.carsCheckbox = this.page.getByRole('checkbox', { name: 'Cars' });
        this.animalsCheckbox = this.page.getByRole('checkbox', { name: 'Animals' });
        this.schoolCheckbox = this.page.getByRole('checkbox', { name: 'School' });
        this.otherCheckbox = this.page.getByRole('checkbox', { name: 'Other' });
        this.animalsTextbox = this.page.getByRole('textbox', { name: 'Essay about Animals' });
        this.schoolTextbox = this.page.getByRole('textbox', { name: 'Essay about School' });
    }

    async performEssayPageActions() {

        // Verify page title
        await this.pageTitle.waitFor({ state: 'visible' });

        // Perform checkbox and essay actions
        await this.toggleCheckbox(this.carsCheckbox, 'Essay about Cars *');
        await this.toggleCheckbox(this.animalsCheckbox, 'Essay about Animals *');
        await this.toggleCheckbox(this.schoolCheckbox, 'Essay about School *');
        await this.toggleCheckbox(this.otherCheckbox, 'Provide an essay about any');

        // Recheck specific checkboxes and fill textboxes
        await this.animalsCheckbox.check();
        await this.schoolCheckbox.check();
        await this.animalsTextbox.fill('Animal Essay TextBox');
        await this.schoolTextbox.fill('School Essay TextBox');
        await this.page.waitForTimeout(2000);
    }

    private async toggleCheckbox(checkbox: Locator, textToClick: string) {
        await checkbox.check();
        await this.page.getByText(textToClick).click();
        await checkbox.uncheck();
    }
}