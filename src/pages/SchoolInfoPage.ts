import { Locator, Page } from "@playwright/test";
import BasePage from "../utils/basePage";
import schooldata from '../data/schoolData.json';

export class SchoolInfoPage extends BasePage {

    readonly page: Page;
    private readonly pageTitle: Locator;
    private readonly highSchoolNameInput: Locator;
    private readonly highSchoolAddressInput: Locator;
    private readonly highSchoolCityInput: Locator;
    private readonly highSchoolStateInput: Locator;
    private readonly highSchoolStateOption: Locator;
    private readonly highSchoolZipCodeInput: Locator;
    private readonly gpaInput: Locator;
    private readonly graduationYearInput: Locator;
    private readonly uploadFileButton: Locator;
    private readonly formRenderer: Locator;

    constructor(page: Page) {
        
        super(page);
        this.page = page;

        // Initialize locators
        this.pageTitle = this.page.getByTestId('page-title');
        this.highSchoolNameInput = this.page.getByRole('textbox', { name: 'High School Name' });
        this.highSchoolAddressInput = this.page.getByRole('textbox', { name: 'High School Street Address', exact: true });
        this.highSchoolCityInput = this.page.getByRole('textbox', { name: 'High School City' });
        this.highSchoolStateInput = this.page.getByRole('textbox', { name: 'High School State (Full)' });
        this.highSchoolStateOption = this.page.getByRole('option', { name: 'California' });
        this.highSchoolZipCodeInput = this.page.getByRole('textbox', { name: 'High School Zip Code' });
        this.gpaInput = this.page.getByRole('textbox', { name: 'GPA' });
        this.graduationYearInput = this.page.getByRole('textbox', { name: 'Year of High School Graduation' });
        this.uploadFileButton = this.page.getByRole('button', { name: 'Upload File' });
        this.formRenderer = this.page.locator('#form-renderer');
    }


    async fillSchoolDetails() {   
        
        // Verify page title
        await this.$expectToContainText(this.pageTitle, 'High School Information');
    
        // Fill school details
        await this.$textBoxFill(this.highSchoolNameInput, schooldata.School.name);
        await this.$textBoxFill(this.highSchoolAddressInput, schooldata.School.address);
        await this.$textBoxFill(this.highSchoolCityInput, schooldata.School.city);

        // Select state
        await this.$clickElement(this.highSchoolStateInput);
        await this.$clickElement(this.highSchoolStateOption);

        // Fill remaining details
        await this.$textBoxFill(this.highSchoolZipCodeInput, schooldata.School.zipCode);
        await this.$textBoxFill(this.gpaInput, schooldata.School.gpa);
        await this.$textBoxFill(this.graduationYearInput, schooldata.School.year);

        // Upload file
        await this.uploadFile('src/data/My School Transcript.pdf', 'My School Transcript.pdf');

    }

    async uploadFile(filePath: string, expectedFileName: string) {
        // Handle file upload
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.$clickElement(this.uploadFileButton),
        ]);
        await fileChooser.setFiles([filePath]);
        
        await this.page.waitForTimeout(5000);
        // Verify uploaded file
        await this.$waitForElementVisible(this.formRenderer);
        await this.$expectToContainText(this.formRenderer, expectedFileName);
    }
}