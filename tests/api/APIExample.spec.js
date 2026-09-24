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
// test('Validate Single Object API', async ({ request }) => {
//     const response = await request.get('https://api.restful-api.dev/objects/1');
//     console.log(await response.json());
//     expect(response.status()).toBe(200);

//     const responseBody = await response.json();
//     expect(responseBody.id).toEqual('1');
//     expect(responseBody.name).toEqual('Google Pixel 6 Pro');
//     expect(responseBody.data.color).toEqual('Cloudy White');
//     expect(responseBody.data.capacity).toEqual('128 GB');

// })

test('Validate Create Object API', async ({ request }) => {
    const requestBody = {
        "name": "Apple MacBook",
        "data": {
            "year": 2019,
            "price": 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    }

    const response = await request.post('https://api.restful-api.dev/objects', {
        data: requestBody,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.name).toEqual('Apple MacBook');
    expect(responseBody.data.year).toEqual(2019);
    expect(responseBody.data.price).toEqual(1849.99);
    expect(responseBody.data["CPU model"]).toEqual('Intel Core i9');
    expect(responseBody.data["Hard disk size"]).toEqual('1 TB');
    const createdObjectId = responseBody.id;
    const response1 = await request.get('https://api.restful-api.dev/objects/' + createdObjectId);
    console.log(await response1.json());
    expect(response1.status()).toBe(200);

    const response2 = await request.put('https://api.restful-api.dev/objects/' + createdObjectId,
        {
            data: {

                "name": "Apple MacBook Pro",
                "data": {
                    "year": 2020,
                    "price": 1999.99,
                }
            }
        })

    console.log(await response2.json());
    expect(response2.status()).toBe(200);
    const responseBody1 = await response2.json();
    expect(responseBody1.name).toEqual('Apple MacBook Pro');
    expect(responseBody1.data.year).toEqual(2020);
    expect(responseBody1.data.price).toEqual(1999.99);



});