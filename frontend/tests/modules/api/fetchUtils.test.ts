import { fetchImageUrl } from '../../../src/modules/api/fetchUtils';

// Type `global.fetch` as a Jest mock function
global.fetch = jest.fn();

describe('fetchImageUrl', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Safe because we are explicitly mocking global.fetch for Jest tests
  const mockFetch = global.fetch as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the image URL if the image is found', async () => {
    const mockData = {
      query: {
        pages: {
          '123': {
            imageinfo: [{ url: 'https://example.com/test.jpg' }],
          },
        },
      },
    };

    const mockHeadResponse = {
      ok: true, // Simulates a successful HEAD request
    };

    // Mock the first fetch call
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    // Mock the second fetch call
    mockFetch.mockResolvedValueOnce(mockHeadResponse);

    const result = await fetchImageUrl('Test.jpg');

    expect(result).toBe('https://example.com/test.jpg');
  });

  it('should return the fallback image URL if the image is not found', async () => {
    console.error = jest.fn(); // Mock console.error

    // Mock the first fetch call to return a response with null data
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        query: {
          pages: {}, // Simulate no image found
        },
      }),
    });

    const result = await fetchImageUrl('test.jpg');

    // Expect the fallback URL
    expect(result).toBe('media/urban-bear.jpg');

    // Expect an error to be logged
    expect(console.error).toHaveBeenCalledWith('Image not found');
  });
});
