// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('Hello')).resolves.toBe('Hello');
    await expect(resolveValue(42)).resolves.toBe(42);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('Test error')).toThrow('Test error');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});

describe('MyAwesomeError', () => {
  test('should be an instance of Error', () => {
    const error = new MyAwesomeError();
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(MyAwesomeError);
    expect(error.message).toBe('This is my awesome custom error!');
  });
});
