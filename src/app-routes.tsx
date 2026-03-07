import type { ComponentType } from 'react';
import HomePage from './pages/Home';
import CustomLists from './pages/CustomLists';
import Contribution from './pages/Contribution';
import MobileApp from './pages/MobileApp';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteAccount from './pages/DeleteAccount';

export interface RouteConfig {
    path: string;
    name: string;
    component: ComponentType;
    showInNav: boolean;
}

export const appRoutes: RouteConfig[] = [
    {
        path: '/',
        name: 'nav.home',
        component: HomePage,
        showInNav: true,
    },
    {
        path: '/mobile',
        name: 'nav.mobile',
        component: MobileApp,
        showInNav: true,
    },
    {
        path: '/contribution',
        name: 'nav.contribution',
        component: Contribution,
        showInNav: true,
    },
    {
        path: '/custom-lists',
        name: 'nav.custom_lists',
        component: CustomLists,
        showInNav: true,
    },
    {
        path: '/privacy',
        name: 'Privacy Policy',
        component: PrivacyPolicy,
        showInNav: false,
    },
    {
        path: '/delete-account',
        name: 'Delete Account',
        component: DeleteAccount,
        showInNav: false,
    },
    // To add a new page, simply add object here.
    // Example:
    // { path: '/about', name: 'About', component: AboutPage, showInNav: true }
];
