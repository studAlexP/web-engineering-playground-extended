import type { Bear } from '../../types/bear';

export const fetchBears = async (pageTitle: string): Promise<Bear[]> => {
  const backendUrl = `http://localhost:5000/bears?page_title=${encodeURIComponent(pageTitle)}`;

  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type safety assured through own API
    return (await response.json()) as Bear[];
  } catch (error) {
    console.log('Error fetching bears from backend:', error);
    return [];
  }
};
