import { FC } from 'react';
import { FiEdit2, FiTrash } from 'react-icons/fi';

import useUserContext from '../hooks/useUserContext';
import { ModalType } from '../context';
import { User, UserProperties } from '../types/user.types';

interface Props {
  data: User[];
  headings: string[];
  properties: UserProperties[];
}

const Table: FC<Props> = ({ data, headings, properties }) => {
  const { setIsModalHidden, setModalType, setSelectedUser } = useUserContext();

  const handleActionClick = (user: User, action: ModalType) => {
    setIsModalHidden(false);
    setModalType(action);
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
                    <td key={index}>
                      {property === 'role' && !obj.role ? '-' : obj[property]}
                    </td>
                  ))}
                  <td className='actions'>
                    <button
                      type='button'
                      onClick={() => handleActionClick(obj, 'edit')}
                    >
                      <FiEdit2 title='Edit' />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleActionClick(obj, 'delete')}
                    >
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
