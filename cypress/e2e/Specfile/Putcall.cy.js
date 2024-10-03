/// <reference types='cypress'/>
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let accessToken = '6a55fca6e0f85fe1e9606ecfb61dbdddde74165a1725fe9d91e7338ab97849ca';
let testemail = "";
let randomtest = "";
let userId;

Given('the API endpoint is ready to accept requests', () => {
    cy.log('API endpoint is ready');
});

When('I create a new user', () => {
    const bearerToken = Cypress.env('bearerToken');
    let pattern = 'ABCDEFGHJIKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    randomtest = '';

    for (let i = 0; i < 10; i++) {
        randomtest += pattern.charAt(Math.floor(Math.random() * pattern.length));
    }
    testemail = randomtest + '@gmail.com';

    cy.request({
        method: 'POST',
        url: '/public/v2/users',
        headers: {
            authorization: "Bearer " + bearerToken,
        },
        body: {
            "name": 'kashif',
            "gender": 'male',
            "status": 'active',
            "email": testemail
        }
    }).then((res) => {
        cy.log(JSON.stringify(res));
        expect(res.status).to.eq(201);
        expect(res.body).to.have.property('name', 'kashif');
        expect(res.body).to.have.property('gender', 'male');
        expect(res.body).to.have.property('status', 'active');
        expect(res.body).to.have.property('email', testemail);

        userId = res.body.id; // Store the userId for later use
    });
});

When('I update the user\'s information', () => {
    const bearerToken = Cypress.env('bearerToken');

    cy.request({
        method: 'PUT',
        url: '/public/v2/users/' + userId,
        headers: {
            authorization: "Bearer " + bearerToken,
        },
        body: {
            "name": 'kashif ali update',
            "gender": 'male',
            "status": 'inactive',
            "email": testemail
        }
    }).then((res) => {
        cy.log(JSON.stringify(res));
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('name', 'kashif ali update');
        expect(res.body).to.have.property('gender', 'male');
        expect(res.body).to.have.property('status', 'inactive');
        expect(res.body).to.have.property('email', testemail);
    });
});

Then('the user should be updated successfully', () => {
    // You can add additional checks or log messages here if needed
    cy.log('User updated successfully');
});
