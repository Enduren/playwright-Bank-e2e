import { expect, Locator, Page } from '@playwright/test';


class HomePage {
    readonly page: Page;


    constructor(page:Page) {
        this.page = page;
    }
}