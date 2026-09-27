import { APIBase } from '../../utils/APIBase';
import { APIEndpoint } from '../../utils/APIEndpoint';
import { expect, test } from '@playwright/test';
let apiBase;
let apiEndpoint;
const data = JSON.parse(JSON.stringify(require('../../testData/object.json')));

test.beforeAll(async () => {
    apiBase = new APIBase();
    apiEndpoint = new APIEndpoint();
    await apiBase.init();
    apiBase.baseURL = process.env.API_URL;

})


test('Validate Single Object API', async ({ request }) => {

    const id = '1'; // Replace with the actual ID of the object you want to retrieve
    // Set the base URL for the API
    const response = await apiBase.get(apiEndpoint.GetSingleObject + id);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.id).toEqual(id);
});
test('Validate All Objects API', async ({ request }) => {
    const response = await apiBase.get(apiEndpoint.GetAllObjects);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
});

test('Validate Create Object API', async ({ request }) => {

    console.log('data', data);
    const requestBody = data.createObject;
    const response = await apiBase.post(apiEndpoint.GetAllObjects, requestBody);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.name).toEqual(requestBody.name);
    expect(responseBody.data.year).toEqual(requestBody.data.year);
    expect(responseBody.data.price).toEqual(requestBody.data.price);

    const createdObjectId = responseBody.id;
    const response1 = await apiBase.get(apiEndpoint.GetSingleObject + createdObjectId);
    console.log(await response1.json());
    expect(response1.status()).toBe(200);
}
);