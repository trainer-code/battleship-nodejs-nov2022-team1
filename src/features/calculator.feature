Feature: Simple Calculator
  As a responsible user
  In order to carry out simple maths
  I want to execute each operator with various numbers

  Scenario: Calculate single addition
    Given I have a calculator;
    When I enter the following two numbers: 3 and 5,
    Then I will get a total value of 8.

  Scenario Outline: Calculate multiple additions
    Given I have a calculator;
    When I enter the following two numbers: <number1> and <number2>,
    Then I will get a total value of <sum>.

  Examples:
    | number1 | number2 | sum   |
    |    12   |   5     |  17   |
    |    20   |   5     |  25   |
    |   120   |   -78   |  42   |
    |     0   |   5     |  5    |
