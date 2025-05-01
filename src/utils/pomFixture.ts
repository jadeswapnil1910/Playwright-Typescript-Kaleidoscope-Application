import { test as baseTest } from '@playwright/test';

import { LandingPage } from '../pages/LandingPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { UserDeatilPage } from '../pages/UserDetailPage';
import { ActivitiesPage } from '../pages/ActivitiesPage';
import { SchoolInfoPage } from '../pages/SchoolInfoPage';
import { EssayPage } from '../pages/EssayPage';
import { ReviewPage } from '../pages/ReviewPage';

type pages = {
    landingPg: LandingPage,
    registrationPg: RegistrationPage,
    userDetailPg: UserDeatilPage,
    activitiesPg: ActivitiesPage,
    schoolInfoPg: SchoolInfoPage,
    essayPg: EssayPage,
    reviewPg: ReviewPage
};

const testPages = baseTest.extend<pages>({
    landingPg: async ({ page }, use) => {
        await use(new LandingPage(page));
    },
    registrationPg: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },
    userDetailPg: async ({ page }, use) => {
        await use(new UserDeatilPage(page));
    },
    activitiesPg: async ({ page }, use) => {
        await use(new ActivitiesPage(page));
    },
    schoolInfoPg: async ({ page }, use) => {
        await use(new SchoolInfoPage(page));
    },
    essayPg: async ({ page }, use) => {
        await use(new EssayPage(page));
    },
    reviewPg: async ({ page }, use) => {
        await use(new ReviewPage(page));
    },
});

export const test = testPages;
export const expect = baseTest.expect;