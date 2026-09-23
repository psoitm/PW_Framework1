import { test, expect } from '@playwright/test';


test("Verify Get Request API", async ({ request }) => {
    const response = await request.get('https://api.restful-api.dev/objects');
    console.log(await response.json());
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBeGreaterThan(0);

    expect(responseBody).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String),


            }),
        ])
    );




});
test('Validate Single Object API', async ({ request }) => {
    const response = await request.get('https://api.restful-api.dev/objects/1');
    console.log(await response.json());
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.id).toEqual('1');
    expect(responseBody.name).toEqual('Google Pixel 6 Pro');
    expect(responseBody.data.color).toEqual('Cloudy White');
    expect(responseBody.data.capacity).toEqual('128 GB');

})