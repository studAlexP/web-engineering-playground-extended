interface ApiResponse {
  parse?: {
    wikitext?: {
      '*': string;
    };
  };
  query?: {
    pages?: Record<
      string,
      {
        imageinfo?: Array<{ url: string }>;
      }
    >;
  };
}

export const fetchData = async (
  url: string,
  params: Record<string, string>
): Promise<ApiResponse | null> => {
  try {
    const fullUrl = `${url}?${new URLSearchParams(params).toString()}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- response will always be of type ApiResponse
    return (await response.json()) as ApiResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

interface ImageInfo {
  url: string;
}

type Pages = Record<
  string,
  {
    imageinfo?: ImageInfo[];
  }
>;

export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const baseUrl = 'https://en.wikipedia.org/w/api.php';
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const firstImageNumber = 0;

  try {
    const data = await fetchData(baseUrl, imageParams);

    if (data?.query?.pages != null) {
      const pages: Pages = data.query.pages;

      for (const pageId in pages) {
        const { imageinfo } = pages[pageId] ?? {};

        if (imageinfo != null && imageinfo.length > firstImageNumber) {
          return imageinfo[firstImageNumber].url;
        }
      }
    }

    console.error('Image not found');
    return 'media/urban-bear.jpg';
  } catch (error: unknown) {
    console.error('Error fetching image URL:', error);
    return 'media/urban-bear.jpg';
  }
};
