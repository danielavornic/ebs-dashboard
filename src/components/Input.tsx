interface Props {
  type: 'text' | 'email' | 'checkbox' | 'password';
  name: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, name, id, placeholder, value, onChange }: Props) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
      minLength={type === 'password' ? 8 : 0}
    />
  );
};

export default Input;
