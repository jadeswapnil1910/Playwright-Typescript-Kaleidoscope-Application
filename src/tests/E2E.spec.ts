import { test, expect } from '../utils/pomFixture';


test('End-to-End Application Submission Flow', async ({ page,

    // page objects from fixture
    landingPg,      
    registrationPg,
    userDetailPg,
    activitiesPg,  
    schoolInfoPg, 
    essayPg,   
    reviewPg        

 }) => {

    // Landing Page
    await test.step('Navigate to Landing Page', async () => {

        await landingPg.navigateToLandingPage();
    });

    // Registration Page
    await test.step('Sign in and Create User', async () => {

        await registrationPg.signInToApp();
        await registrationPg.createUser();
    });

    // User Detail Page
    await test.step('Fill User Details', async () => {

        await userDetailPg.fillUserDetails();
    });

    // Extracurricular Activities Page
    await test.step('Add Extracurricular Activities', async () => {

        await activitiesPg.validateActivitiesPage();
        await activitiesPg.addEntryPopup(1);    
        await activitiesPg.validateNumofActivities();
        await activitiesPg.addEntryPopup(2);
        await activitiesPg.$clickSaveButton();
        await activitiesPg.$clickNextPageButton();
    });

    // School Information Page
    await test.step('Fill School Information', async () => {

        await schoolInfoPg.fillSchoolDetails();
        await schoolInfoPg.$clickSaveButton();
        await schoolInfoPg.$clickNextPageButton();
        
    });

    // Essay Page
    await test.step('Complete Essay Section', async () => {

        await essayPg.essayPgActions();
        await essayPg.$clickSaveButton();
        await essayPg.$clickNextPageButton();
    });

    // Review Page
    await test.step('Validate and Submit Application', async () => {

        await reviewPg.validateApplication();
    });
});