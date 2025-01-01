import type { BearTableProps } from '../types/bear.ts';

const headers: string[] = [
  'Bear Type',
  'Coat',
  'Adult Size',
  'Habitat',
  'Lifespan',
  'Diet',
];

function BearTable({ bears }: BearTableProps): React.JSX.Element {
  return (
    <table>
      <caption>A table showing different kinds of bears</caption>
      <thead>
        <tr>
          {headers.map((header) => (
            <th scope="col" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bears.map((bear, index) => (
          <tr key={index}>
            <th scope="row">{bear.type}</th>
            <td>{bear.coat}</td>
            <td>{bear.size}</td>
            <td>{bear.habitat}</td>
            <td>{bear.lifespan}</td>
            <td>{bear.diet}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BearTable;
