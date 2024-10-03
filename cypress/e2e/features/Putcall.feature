Feature: Update User API

  Scenario: Update user data
    Given the API endpoint is ready to accept requests
    When I create a new user
    And I update the user's information
    Then the user should be updated successfully
