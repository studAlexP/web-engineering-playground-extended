import { useEffect, useState } from 'react';
import { fetchBears } from '../modules/api/fetchUtils';
import type { Bear } from '../types/bear.ts';

const BearList: React.FC = () => {
  const [bears, setBears] = useState<Bear[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const minimumBears = 0;
  const pageTitle = 'List of ursids';

  useEffect(() => {
    const getBearData = async (): Promise<void> => {
      try {
        setLoading(true);
        const bearsData = await fetchBears(pageTitle);
        if (bearsData.length > minimumBears) {
          setBears(bearsData);
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
