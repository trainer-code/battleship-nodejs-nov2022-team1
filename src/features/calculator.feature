Feature: Simple Calculator
  As a responsible user
  In order to carry out simple maths
  I want to execute each operator with various numbers

  Scenario: Calculate single addition
    Given I have a calculator;
    When I enter the following two numbers: 3 and 5,
    Then I will get a total value of 8 if I use "addition".


  Scenario: Calculate single multiplication
  Given I have a calculator;
  When I enter the following two numbers: 3 and 5,
  Then I will get a total value of 15 if I use "multiplication".

  Scenario Outline: Calculate multiple additions
    Given I have a calculator;
    When I enter the following two numbers: <number1> and <number2>,
    Then I will get a total value of <result> if I use "<operator>".

  Examples:
    | number1 | number2 | result   | operator       |
    |    12   |   5     |  17      | addition       |
    |    20   |   5     |  25      | addition       |
    |    6    |   10    |  60      | multiplication |
    |    11   |   5     |  55      | multiplication |
