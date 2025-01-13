import type { Bear } from '../../types/bear';

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5462";

export const fetchBears = async (pageTitle: string): Promise<Bear[]> => {
  const backendUrl = `${baseUrl}/bears?page_title=${encodeURIComponent(pageTitle)}`;

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
