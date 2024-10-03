Feature: API Tests
 Given the API endpoint is ready to accept requests
  Scenario: Get all users
   
    When I send a GET request to retrieve all users
    Then the response should have a status of 200

  Scenario: Get user by ID
#     Given the API endpoint is ready to accept requests
    When I send a GET request to retrieve a user by ID
    Then the response should have a status of 200
    # And the user's name should be "kashif ali"
