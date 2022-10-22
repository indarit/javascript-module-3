import { add } from "../utils/numbers";

/**
 * Finish the test so that it checks if the result
 * of calling the add function with the arguments of
 * 2 and 4 is 6
 */
describe("01-exercise", () => {
  test("add return the sum of the numbers", () => {
    const a = 2;
    const b = 4;
    const resul = add(a, b);
    expect(resul).toBe(6);
    // Finish the test
  });
});
