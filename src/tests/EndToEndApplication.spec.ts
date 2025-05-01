import { test } from '../utils/PomFixture';


test('End-to-End Kaleidoscope Application Submission Flow', async ({

    // page objects from fixture
    landingPage,
    registrationPage,
    userDetailsPage,
    activitiesPage,
    schoolInfoPage, 
    essayPage,   
    reviewPage        

 }) => {

    // Landing Page
    await test.step('Navigate to Landing Page', async () => {

        await landingPage.navigateToLandingPage();
    });

    // Registration Page
    await test.step('Sign in and Create User', async () => {

        await registrationPage.signInToApp();
        await registrationPage.createUser();
    });

    // User Detail Page
    await test.step('Fill User Details', async () => {

        await userDetailsPage.fillUserDetails();
    });

    // Extracurricular Activities Page
    await test.step('Add Extracurricular Activities', async () => {

        await activitiesPage.validateActivitiesPage();

        try{
            await activitiesPage.addEntryPopup(0);    
            await activitiesPage.validateNumOfActivities();
            for (let index = 1; index < 4; index++) {
                await activitiesPage.addEntryPopup(index);
            }
        }
        catch(error){
            console.error('Error clicking Save button:', error);
            await activitiesPage.page.reload();
            await activitiesPage.addEntryPopup(0);    
            await activitiesPage.validateNumOfActivities();
            for (let index = 1; index < 4; index++) {
                await activitiesPage.addEntryPopup(index);
            }
        }
        finally {
            await activitiesPage.clickNextPageButton();
        }
    });

    // School Information Page
    await test.step('Fill School Information', async () => {

        try {
            await schoolInfoPage.fillSchoolDetails();
            await schoolInfoPage.clickSaveButton();
        } catch (error) {
            console.error('Error clicking Save button:');
            await schoolInfoPage.page.reload(); // Reload the current page
            await schoolInfoPage.fillSchoolDetails(); // Retry filling school details
            await schoolInfoPage.clickSaveButton(); // Retry clicking Save button
        }
        finally {
            await schoolInfoPage.clickNextPageButton();
        }
    });

    // Essay Page
    await test.step('Complete Essay Section', async () => {

        await essayPage.performEssayPageActions();
        await essayPage.clickSaveButton();
        await essayPage.clickNextPageButton();
    });

    // Review Page
    await test.step('Validate and Submit Application', async () => {

        await reviewPage.validateApplication();
    });
});