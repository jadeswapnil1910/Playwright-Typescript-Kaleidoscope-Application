import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../utils/basePage";
import act from '../data/activityData.json';

export class ActivitiesPage extends BasePage {

    readonly page: Page;
    private readonly pageTitle: Locator;
    private readonly addEntryButton: Locator;
    private readonly modalInner: Locator;
    private readonly activityNameInput: Locator;
    private readonly numberYearsInput: Locator;
    private readonly leadershipRolesTextarea: Locator;
    private readonly descriptionTextarea: Locator;
    private readonly addButton: Locator;
    private readonly entryError: Locator;

    constructor(page: Page) {
        
        super(page);
        this.page = page;

        // Initialize locators
        this.pageTitle                  = this.page.getByTestId('page-title');
        this.addEntryButton             = this.page.getByRole('button', { name: 'Add Entry' });
        this.modalInner                 = this.page.locator('.mantine-Modal-inner');
        this.activityNameInput          = this.modalInner.locator('input[placeholder="Short Input"]');
        this.numberYearsInput           = this.modalInner.locator('input[placeholder="123"]');
        this.leadershipRolesTextarea    = this.modalInner.locator('textarea[placeholder="Long Input"]').first();
        this.descriptionTextarea        = this.modalInner.locator('textarea[placeholder="Long Input"]').last();
        this.addButton                  = this.modalInner.getByRole('button', { name: 'Add', exact: true });
        this.entryError                 = this.page.locator('#form-renderer');
    }

    async validateActivitiesPage() {

        await this.$expectToContainText(this.pageTitle, 'Extracurricular Activities');
    }


    async addEntryPopup(actNum: number) {

        await this.$clickElement(this.addEntryButton);
        await this.page.waitForLoadState();
        await this.$waitForElementVisible(this.modalInner);
        await this.$expectToContainText(this.modalInner.locator('label').first(), 'Extracurricular Activity Name *');
        await this.$textBoxFill(this.activityNameInput, act[actNum].ActivityName);
        await this.$textBoxFill(this.numberYearsInput, act[actNum].NumberYears);
        await this.$textBoxFill(this.leadershipRolesTextarea, act[actNum].leadershipRoles);
        await this.$textBoxFill(this.descriptionTextarea, act[actNum].Description);
        await this.$clickElement(this.addButton);
        await this.page.waitForTimeout(4000);
    }

    async validateNumofActivities() {

        await this.$clickNextPageButton();
        await this.$expectToContainText(this.entryError, 'Please add at least 2 entries');
        await this.page.waitForTimeout(2000);
    }
}