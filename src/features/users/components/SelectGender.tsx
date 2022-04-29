import { FC } from 'react';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectGender: FC<Props> = ({ onChange }) => (
  <select
    name='gender'
    id='gender'
    onChange={onChange}
    required
    defaultValue={''}
  >
    <option value='' disabled hidden>
      Gender
    </option>
    <option value='Male'>Male</option>
    <option value='Female'>Female</option>
    <option value='Prefer not to say'>Prefer not to say</option>
  </select>
);

export default SelectGender;
