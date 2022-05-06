import { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
  height?: string;
}

export const Textarea = ({
  name,
  id,
  placeholder,
  value,
  width,
  height,
  onChange,
  ...props
}: Props) => {
  return (
    <textarea
      className={`textarea textarea--w-${width} textarea--h-${height} custom-scrollbar`}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
