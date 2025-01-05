import { fetchImageUrl } from '../../../src/modules/api/fetchUtils';

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
      ok: true,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    mockFetch.mockResolvedValueOnce(mockHeadResponse);

    const result = await fetchImageUrl('Test.jpg');

    expect(result).toBe('https://example.com/test.jpg');
  });

  it('should return the fallback image URL if the image is not found', async () => {
    console.error = jest.fn();

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        query: {
          pages: {},
        },
      }),
    });

    const result = await fetchImageUrl('test.jpg');

    expect(result).toBe('media/urban-bear.jpg');
    expect(console.error).toHaveBeenCalledWith('Image not found');
  });
});
