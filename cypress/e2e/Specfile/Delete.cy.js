/// <reference types="cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let response;
let testemail = "";
let randomtest = "";

// Given step to set up the environment
Given('the API endpoint is ready to accept requests', () => {
    cy.log('API endpoint is ready');
});

// When step for creating a user
When('I create a user', () => {
    const bearerToken = Cypress.env('bearerToken');
    const pattern = 'ABCDEFGHJIKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // Generate random email
    for (let i = 0; i < 10; i++) {
        randomtest += pattern.charAt(Math.floor(Math.random() * pattern.length));
    }
    testemail = randomtest + '@gmail.com';

    // POST request to create the user
    cy.request({
        method: 'POST',
        url: "https://gorest.co.in/public/v2/users",
        headers: {
            authorization: "Bearer " + bearerToken,
        },
        body: {
            "name": 'kashif',
            "gender": 'male',
            "status": 'active',
            "email": testemail,
        }
    }).then((res) => {
        response = res; // Store the response for later assertions
        expect(res.status).to.eq(201);
        expect(res.body).to.have.property('name', 'kashif');
        expect(res.body).to.have.property('gender', 'male');
        expect(res.body).to.have.property('status', 'active');
        expect(res.body).to.have.property('email', testemail);
    });
});

// Then step for deleting the user
Then('I delete the user', () => {
    const bearerToken = Cypress.env('bearerToken');
    const userId = response.body.id; // Get the user ID from the response

    expect(userId).to.exist; // Check if userId exists

    // DELETE request to delete the user
    cy.request({
        method: 'DELETE',
        url: 'https://gorest.co.in/public/v2/users/' + userId,
        headers: {
            authorization: "Bearer " + bearerToken,
        }
    }).then((res) => {
        cy.log('User ID is ' + userId);
        expect(res.status).to.eq(204); // Assert that the response status is 204
    });
});
