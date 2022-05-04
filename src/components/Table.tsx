import { FC } from 'react';
import { FiEdit2, FiTrash } from 'react-icons/fi';

import useUserContext from 'hooks/useUserContext';
import { ModalType } from 'context';
import { User, UserProperties } from 'types/user';

interface Props {
  data: User[];
  headings: string[];
  properties: UserProperties[];
}

const Table: FC<Props> = ({ data, headings, properties }) => {
  const { user, setIsModalHidden, setModalType, setSelectedUser } =
    useUserContext();

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
            {user && user.role === 'administrator' && <th>Actions</th>}
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
                  {user && user.role === 'administrator' && (
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
                  )}
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
