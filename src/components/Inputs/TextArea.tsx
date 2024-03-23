import React from 'react';

interface TextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={4} // Número de linhas visíveis
      cols={50} // Número de colunas visíveis
    />
  );
};

export default TextArea;
