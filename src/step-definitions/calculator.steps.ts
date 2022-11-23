import { binding, given, then, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { ICalculator } from '../interfaces';
import { createCalculator } from '../utility';

@binding()
export class GameSteps {
  calculator: ICalculator;
  result: number;

  @given(/I have a calculator;/)
  public givenAGameBoardExists() {
    this.calculator = createCalculator();
  }

  @when(/I enter the following two numbers: (-?\d+) and (-?\d+),/)
  public calculateAdd(a: number, b: number) {
   this.result = this.calculator.add(a,b);
  }

  @then(/I will get a total value of (-?\d+)\./)
  public placedIntheBoard(expectedResult: number) {
    expect(this.result).to.eql(expectedResult);

  }
}
