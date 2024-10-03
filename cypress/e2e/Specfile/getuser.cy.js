/// <reference types="cypress"/>
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let accessToken = '6a55fca6e0f85fe1e9606ecfb61dbdddde74165a1725fe9d91e7338ab97849ca';
let response;

Given('the API endpoint is ready to accept requests', () => {
    cy.log('API endpoint is ready');
});

When('I send a GET request to retrieve all users', () => {
    cy.request({
        method: "GET",
        url: "/public/v2/users",
        headers: {
            authorization: "Bearer " + accessToken,
        },
    }).then((res) => {
        response = res; // Store the response for later use
    });
});

Then('the response should have a status of {int}', () => {
    //cy.log(JSON.stringify(response))
    expect(response.status).to.eq(200);
});


When('I send a GET request to retrieve a user by ID', () => {
    const userId = 7441953; // Replace with a valid user ID
    cy.request({
        method: "GET",
        url: `/public/v2/users/${userId}`,
        headers: {
            authorization: "Bearer " + accessToken,
        },
    }).then((res) => {
        response = res; // Store the response for later use
    });
    Then('the response should have a status of {int}', () => {
        expect(response.status).to.eq(200);
        expect(response.userId).have.property('kashif ali','kashif ali')
        expect(response.userId).have.property('7441953','7441953')
    });


})

// describe.only('vocable profile ',()=>{
//     let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlZmYzNTVlNy02ZmQ1LTRjNmUtYWVjNi1lZTY2MjlmMTg5ZGIiLCJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzI3NzA0MjAyLCJleHAiOjE3MzAyOTYyMDJ9.MB2JIYURXjimqJ87g8APamiyus9CGj_sFDqjlJdXJV8'
// it("Profile get api",()=>{
//     cy.request({
//         method:'GET',
//         url: 'http://localhost:3000/api/v1/profile',
//         headers:{
//             authorization: 'Bearer ' +accessToken


//         }
//     }).then((res)=>{
//         expect(res.status).to.equal(200)
//         expect(res.body).to.have.property('id', 1);
//         expect(res.body).to.have.property('first_name','kashif');
//         expect(res.body).to.have.property('email','kashif.ali@camp1.tkxel.com');


//     })






// })








