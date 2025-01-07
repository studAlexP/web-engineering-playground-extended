import { fetchBears } from '../../../src/modules/api/fetchUtils';
import type { Bear } from '../../../src/types/bear';

global.fetch = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Accept unsafe type assertion for mock type
const mockFetch = global.fetch as jest.Mock;

describe('fetchBears', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch bears data successfully from the backend', async () => {
    const mockBears: Bear[] = [
      {
        name: 'Grizzly Bear',
        binomial: 'Ursus arctos horribilis',
        image: 'https://example.com/grizzly.jpg',
        range: 'North America',
      },
      {
        name: 'Polar Bear',
        binomial: 'Ursus maritimus',
        image: 'https://example.com/polar.jpg',
        range: 'Arctic Circle',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockBears),
    });

    const pageTitle = 'List_of_ursids';
    const result = await fetchBears(pageTitle);

    expect(mockFetch).toHaveBeenCalledWith(
      `http://localhost:5000/bears?page_title=${encodeURIComponent(pageTitle)}`,
      {
        method: 'GET',
      }
    );

    expect(result).toEqual(mockBears);
  });

  it('should handle network errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const pageTitle = 'List_of_ursids';
    const result = await fetchBears(pageTitle);

    expect(mockFetch).toHaveBeenCalledWith(
      `http://localhost:5000/bears?page_title=${encodeURIComponent(pageTitle)}`,
      {
        method: 'GET',
      }
    );

    expect(result).toEqual([]);
  });
});
