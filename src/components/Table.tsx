import { FiEdit2, FiTrash } from 'react-icons/fi';

import { User, UserProperties } from 'types/user';
import { ModalType } from 'context';
import useUserContext from 'hooks/useUserContext';

import Button from './Button';

interface Props {
  data: User[];
  headings: string[];
  properties: UserProperties[];
}

const Table = ({ data, headings, properties }: Props) => {
  const { user, setIsModalHidden, setModalType, setSelectedUser } =
    useUserContext();

  const handleActionClick = (user: User, action: ModalType) => {
    setIsModalHidden(false);
    setModalType(action);
    setSelectedUser(user);
  };

  return (
    <div className='table-container'>
      <table className='table'>
        <thead className='table__header'>
          <tr>
            <th className='table__cell table__cell--header'>ID</th>
            {headings.map((heading, index) => (
              <th className='table__cell table__cell--header' key={index}>
                {heading}
              </th>
            ))}
            {user && user.role === 'administrator' && (
              <th className='table__cell table__cell--header'>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (obj: User) =>
              obj && (
                <tr key={obj.id}>
                  <td className='table__cell'>{obj.id}</td>
                  {properties.map((property, index) => (
                    <td className='table__cell' key={index}>
                      {obj[property]}
                    </td>
                  ))}
                  {user && user.role === 'administrator' && (
                    <td className='table__cell table__cell--actions'>
                      <Button
                        state='transparent'
                        type='button'
                        icon={<FiEdit2 />}
                        title='Edit'
                        onClick={() => handleActionClick(obj, 'edit')}
                      />
                      <Button
                        state='transparent'
                        type='button'
                        icon={<FiTrash />}
                        title='Delete'
                        onClick={() => handleActionClick(obj, 'delete')}
                      />
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
