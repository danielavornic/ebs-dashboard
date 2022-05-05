import { User, UserInterface } from 'types/user';

interface Props {
  data: User[];
  columns: {
    title: string;
    dataIndex: keyof UserInterface;
    render?: (obj: User) => JSX.Element;
  }[];
}

const Table = ({ columns, data }: Props) => {
  return (
    <div className='table-container'>
      <table className='table'>
        <thead className='table__header'>
          <tr>
            {columns.map((column, index) => (
              <th className='table__cell table__cell--header' key={index}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (obj, index) =>
              obj && (
                <tr key={index}>
                  {columns.map(({ dataIndex, render }, index) => (
                    <td
                      className={`table__cell table__cell--${dataIndex}`}
                      key={index}
                    >
                      {render ? render(obj) : obj[dataIndex]}
                    </td>
                  ))}
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
