import { FC } from 'react';
import { FiEdit2, FiTrash } from 'react-icons/fi';

import { User, UserProperties } from '../types/user.types';
import useUserContext from '../hooks/useUserContext';

interface Props {
  data: User[];
  headings: string[];
  properties: UserProperties[];
}

const Table: FC<Props> = ({ data, headings, properties }) => {
  const { setIsModalHidden, setModalType, setSelectedUser } = useUserContext();

  const handleEdit = (user: User) => {
    setIsModalHidden(false);
    setModalType('edit');
    setSelectedUser(user);
  };

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
                    <button type='button' onClick={() => handleEdit(obj)}>
                      <FiEdit2 title='Edit' />
                    </button>
                    <button type='button'>
                      <FiTrash title='Delete' />
                    </button>
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
