import { Locator, Page } from "@playwright/test";
import BasePage from "../utils/basePage";

export class ReviewPage extends BasePage {

    readonly page: Page;

    private readonly overviewScrollArea: Locator;
    private readonly documentsTab: Locator;
    private readonly applicationTab: Locator;
    private readonly submitButton: Locator;
    private readonly applicationSubmittedText: Locator;
    private readonly welcomeHeading: Locator;

    private readonly letsGetToKnowYouButton: Locator;
    private readonly extracurricularActivitiesButton: Locator;
    private readonly highSchoolInformationButton: Locator;
    private readonly essayButton: Locator;

    constructor(page: Page) {
        
        super(page);
        this.page = page;

        // Initialize locators
        this.overviewScrollArea = this.page.getByTestId('overview-scroll-area');
        this.documentsTab = this.page.getByRole('tab', { name: 'Documents' });
        this.applicationTab = this.page.getByRole('tab', { name: 'Application' });
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.applicationSubmittedText = this.page.getByText('Application submitted,');
        this.welcomeHeading = this.page.getByRole('heading', { name: 'Welcome back, John!' });

        this.letsGetToKnowYouButton = this.page.getByRole('button', { name: '1.Lets get to know you! Edit' }).getByRole('link');
        this.extracurricularActivitiesButton = this.page.getByRole('button', { name: '2.Extracurricular Activities' }).getByRole('link');
        this.highSchoolInformationButton = this.page.getByRole('button', { name: '3.High School Information' }).getByRole('link');
        this.essayButton = this.page.getByRole('button', { name: '4.Essay' }).getByRole('link');
    }

    async validateApplication() {

        // Validate the "Review Your Application" section
        await this.validateReviewSection();

        // Validate the "Documents" tab
        await this.validateDocumentsTab();

        // Validate the "Application" tab
        await this.validateApplicationTab();

        // Submit the application and validate submission
        const currentUrlBeforeSubmit = await this.submitApplication();

        // Redirect back to the review page and validate elements are no longer visible
        await this.validatePostSubmission(currentUrlBeforeSubmit);
    }

    private async validateReviewSection() {

        await this.$expectToContainText(this.overviewScrollArea, 'Review Your Application');
    }

    private async validateDocumentsTab() {

        await this.$clickElement(this.documentsTab);
        await this.$expectToContainText(this.page.getByRole('listitem'), 'My School Transcript.pdf');
    }

    private async validateApplicationTab() {

        await this.$clickElement(this.applicationTab);
        await this.$waitForElementVisible(this.letsGetToKnowYouButton);
        await this.$expectToContainText(this.letsGetToKnowYouButton, 'Edit');
        await this.$expectToContainText(this.extracurricularActivitiesButton, 'Edit');
        await this.$expectToContainText(this.highSchoolInformationButton, 'Edit');
        await this.$expectToContainText(this.essayButton, 'Edit');
        await this.page.waitForTimeout(2000);
    }

    private async submitApplication(): Promise<string> {

        const currentUrlBeforeSubmit = this.page.url();
        console.log('Current page URL is:', currentUrlBeforeSubmit);
        await this.page.waitForTimeout(2000);
        await this.$clickElement(this.submitButton);
        await this.$waitForElementVisible(this.applicationSubmittedText);
        await this.$waitForElementVisible(this.welcomeHeading);
        await this.$expectToContainText(this.welcomeHeading, 'Welcome back, John!');

        return currentUrlBeforeSubmit;
    }

    private async validatePostSubmission(currentUrlBeforeSubmit: string) {
        
        await this.page.waitForTimeout(2000);
        await this.$navigateTo(currentUrlBeforeSubmit);
        await this.$waitForElementHidden(this.letsGetToKnowYouButton);
        await this.$waitForElementHidden(this.extracurricularActivitiesButton);
        await this.$waitForElementHidden(this.highSchoolInformationButton);
        await this.$waitForElementHidden(this.essayButton);
    }
}