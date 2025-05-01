import { test as baseTest } from '@playwright/test';

import { LandingPage } from '../pages/LandingPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { UserDetailPage } from '../pages/UserDetailPage';
import { ActivitiesPage } from '../pages/ActivitiesPage';
import { SchoolInfoPage } from '../pages/SchoolInfoPage';
import { EssayPage } from '../pages/EssayPage';
import { ReviewPage } from '../pages/ReviewPage';

type pages = {
    landingPage: LandingPage,
    registrationPage: RegistrationPage,
    userDetailsPage: UserDetailPage,
    activitiesPage: ActivitiesPage,
    schoolInfoPage: SchoolInfoPage,
    essayPage: EssayPage,
    reviewPage: ReviewPage
};

const testPages = baseTest.extend<pages>({
    landingPage: async ({ page }, use) => {
        await use(new LandingPage(page));
    },
    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },
    userDetailsPage: async ({ page }, use) => {
        await use(new UserDetailPage(page));
    },
    activitiesPage: async ({ page }, use) => {
        await use(new ActivitiesPage(page));
    },
    schoolInfoPage: async ({ page }, use) => {
        await use(new SchoolInfoPage(page));
    },
    essayPage: async ({ page }, use) => {
        await use(new EssayPage(page));
    },
    reviewPage: async ({ page }, use) => {
        await use(new ReviewPage(page));
    },
});

export const test = testPages;
export const expect = baseTest.expect;