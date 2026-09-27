import { request } from '@playwright/test';

export class APIBase {
    constructor() {
        this.baseURL = process.env.API_BASE_URL || 'https://api.restful-api.dev';
        this.apiContext = null;
    }

    async init() {
        this.apiContext = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    async get(endpoint, options = {}) {
        return await this.apiContext.get(endpoint, options);
    }

    async post(endpoint, data, options = {}) {
        return await this.apiContext.post(endpoint, {
            ...options,
            data
        });
    }

    async put(endpoint, data, options = {}) {
        return await this.apiContext.put(endpoint, {
            ...options,
            data
        });
    }

    async patch(endpoint, data, options = {}) {
        return await this.apiContext.patch(endpoint, {
            ...options,
            data
        });
    }

    async delete(endpoint, options = {}) {
        return await this.apiContext.delete(endpoint, options);
    }

    async dispose() {
        await this.apiContext?.dispose();
    }
}
