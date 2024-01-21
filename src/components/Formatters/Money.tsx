// DataFormatada.js
import React from 'react';

export default function Money({ value }: { value: number }) {
  const formattedMoney = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)

  return <span>{formattedMoney}</span>;
};
