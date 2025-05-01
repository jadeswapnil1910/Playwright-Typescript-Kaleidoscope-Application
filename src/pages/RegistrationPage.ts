import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../utils/basePage";
import { faker } from '@faker-js/faker';
import user from '../data/userData.json';
import { log } from "node:console";

export class RegistrationPage extends BasePage {

    readonly page: Page;
    private readonly $signInLabel: Locator;
    private readonly $emailTextBox: Locator;
    private readonly $firstNameTextBox: Locator;
    private readonly $lastNameTextBox: Locator;
    private readonly $phoneTextBox: Locator;
    private readonly $passwordTextBox: Locator;
    private readonly $confirmCheckbox: Locator;

    constructor(page: Page) {
        
        super(page);
        this.page = page;
        this.$signInLabel = this.page.getByRole('heading', { name: 'Sign In To Kaleidoscope' });
        this.$emailTextBox = this.page.getByRole('textbox', { name: 'Email Address' });
        this.$firstNameTextBox = this.page.getByRole('textbox', { name: 'First Name' });
        this.$lastNameTextBox = this.page.getByRole('textbox', { name: 'Last Name' });
        this.$phoneTextBox = this.page.getByRole('textbox', { name: '1 (702) 123-' });
        this.$passwordTextBox = this.page.getByRole('textbox', { name: 'Create a Password' });
        this.$confirmCheckbox = this.page.getByRole('checkbox', { name: 'I confirm that I am at least' });
    }

    async getEmailID(): Promise<string>{

        const randomTwoDigitNumber = Math.floor(10 + Math.random() * 90);
        const domain = faker.internet.domainName();

        return `${user.firstName}.${user.lastName}${randomTwoDigitNumber}@${domain}`;
    }

    async signInToApp() {

        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.$signInLabel).toBeVisible();
        await this.$textBoxFill(this.$emailTextBox, await this.getEmailID());
        await this.$clickNextButton();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async createUser() {

        console.log('User FirstName: ', user.firstName);
        console.log('User LastName: ', user.lastName);
        
        await this.$textBoxFill(this.$firstNameTextBox, user.firstName);
        await this.$textBoxFill(this.$lastNameTextBox, user.lastName);
        await this.$textBoxFill(this.$phoneTextBox, user.phone);
        await this.$textBoxFill(this.$passwordTextBox, user.password);

        await this.$clickElement(this.$confirmCheckbox);
        await this.page.getByRole('checkbox', { name: 'Opt-in to program related SMS' }).uncheck();
        await this.page.getByRole('checkbox', { name: 'Opt-in to promotional emails' }).uncheck();

        await this.$clickSubmitButton();
        await this.page.waitForLoadState('domcontentloaded');
    }

    
}