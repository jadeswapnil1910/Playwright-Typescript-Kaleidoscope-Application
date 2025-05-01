import { Locator, Page } from "@playwright/test";
import BasePage from "../utils/basePage";

export class LandingPage extends BasePage {

    readonly page: Page;
    private readonly $LoginToApplyBtn: Locator;

    constructor(page: Page) {
        
        super(page);
        this.page = page;
        this.$LoginToApplyBtn = this.page.getByRole('button', { name: 'Log In to Apply' });
    }

    async navigateToLandingPage(){

        await this.page.goto(process.env.url!);
        await this.page.waitForLoadState('domcontentloaded');
        console.log('Navigated to page: ',await this.page.title());
        await this.$clickElement(this.$LoginToApplyBtn);
    }

}