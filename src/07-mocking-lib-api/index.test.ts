// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  let mockGet: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'setInterval');

    mockGet = jest.fn().mockResolvedValue({ data: { id: 1, title: 'Test Post' } });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts/1');

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    throttledGetDataFromApi('/posts/1');

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockResponse = { data: { id: 1, title: 'Test Post' } };
    mockGet.mockResolvedValue(mockResponse);

    const promise = throttledGetDataFromApi('/posts/1');

    jest.advanceTimersByTime(THROTTLE_TIME);

    const result = await promise;
    expect(result).toEqual(mockResponse.data);
  });
});
