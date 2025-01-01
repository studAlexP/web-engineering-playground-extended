import { fetchImageUrl } from './fetchUtils';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export const extractBears = async (wikitext: string): Promise<Bear[]> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');

    for (const row of rows) {
      const nameMatch = /\|name=\[\[(.*?)]]/.exec(row);
      const binomialMatch = /\|binomial=(.*?)\n/.exec(row);
      const imageMatch = /\|image=(.*?)\n/.exec(row);
      const rangeMatch = /\|range=(.*?)([|\n])/.exec(row);

      const selectFirstImageMatch = 1;

      if (nameMatch != null && binomialMatch != null && imageMatch != null) {
        const fileName = imageMatch[selectFirstImageMatch]
          .trim()
          .replace('File:', '');
        const range =
          rangeMatch != null
            ? rangeMatch[selectFirstImageMatch].trim()
            : 'Range not available';

        try {
          const imageUrl: string = await fetchImageUrl(fileName);
          const bear = {
            name: nameMatch[selectFirstImageMatch],
            binomial: binomialMatch[selectFirstImageMatch],
            image: imageUrl,
            range,
          };
          bears.push(bear);
        } catch (error) {
          console.error(
            'Error fetching image URL for bear: ',
            nameMatch[selectFirstImageMatch]
          );
        }
      }
    }
  }

  return bears;
};
