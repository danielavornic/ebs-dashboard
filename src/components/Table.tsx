import { FC } from 'react';

import { User, UserProperties } from '../types/user.types';

import { FiEdit2, FiTrash } from 'react-icons/fi';

interface Props {
  data: User[];
  headings: string[];
  properties: UserProperties[];
}

const Table: FC<Props> = ({ data, headings, properties }) => {
  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (obj: User) =>
              obj && (
                <tr key={obj.id}>
                  <td>{obj.id}</td>
                  {properties.map((property, index) => (
                    <td key={index}>{obj[property]}</td>
                  ))}
                  <td className='actions'>
                    <FiEdit2 title='Edit' />
                    <FiTrash title='Delete' />
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
