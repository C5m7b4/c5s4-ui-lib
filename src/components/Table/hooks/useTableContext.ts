import { useContext } from 'react';
import { TableContext } from '../TableProvider';

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useContext must be used within a TableProvider');
  }

  return context;
};
