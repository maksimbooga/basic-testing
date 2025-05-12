// Uncomment the code below and write your tests
 import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly calculate a action b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    }
  );

  test('should return null for an invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2', b: 3, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: 2, b: '3', action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: null, b: 3, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: 2, b: undefined, action: Action.Add })).toBeNull();
  });
});
