// DataFormatada.js
import React from 'react';
import { format } from 'date-fns';

export default function Date({ date }: { date: string }) {
  const formattedData = format(date, 'dd/MM/yyyy');

  return <span>{formattedData}</span>;
};
