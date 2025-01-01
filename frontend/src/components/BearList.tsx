import { useEffect, useState } from 'react';
import { fetchData } from '../modules/api/fetchUtils';
import { extractBears } from '../modules/api/bearParser';

const baseUrl = 'https://en.wikipedia.org/w/api.php';
const title = 'List_of_ursids';

const params = {
  action: 'parse',
  page: title,
  prop: 'wikitext',
  section: '3',
  format: 'json',
  origin: '*',
};

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

const BearList: React.FC = () => {
  const [bears, setBears] = useState<Bear[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const minimumBears = 0;

  useEffect(() => {
    const getBearData = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await fetchData(baseUrl, params);

        if (data?.parse?.wikitext != null) {
          const { wikitext } = data.parse ?? {};
          if (wikitext != null) {
            const bearsData = await extractBears(wikitext['*']);
            setBears(bearsData);
          }
        } else {
          setError('No bear data found.');
        }
      } catch (err) {
        setError('Error fetching bear data');
      } finally {
        setLoading(false);
      }
    };

    void getBearData();
  }, []);

  if (loading) {
    return <div>Loading bear data...</div>;
  }

  if (error != null) {
    return <div>{error}</div>;
  }

  return (
    <div className="bear-list">
      <h2>More Bears</h2>
      {bears.length > minimumBears ? (
        bears.map((bear) => (
          <div key={bear.name} className="bear-item">
            <h3>
              {bear.name} ({bear.binomial})
            </h3>
            <img src={bear.image} alt={bear.name} width="200" height="auto" />
            <p>
              <strong>Range:</strong> {bear.range}
            </p>
          </div>
        ))
      ) : (
        <p>No bears found.</p>
      )}
    </div>
  );
};

export default BearList;
