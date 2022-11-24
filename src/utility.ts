import { ICalculator } from "./interfaces";

export function createCalculator(): ICalculator {
    return {
        add: (a, b) => a + b,
        divide: (a,b) => a / b,
        multiply: (a,b) => a * b
    }
}