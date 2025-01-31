import { createContext, ReactNode } from 'react';

interface TableContextType {
  editable: boolean;
}

export const TableContext = createContext<TableContextType | null>(null);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TableContext.Provider value={{ editable: false }}>
      {children}
    </TableContext.Provider>
  );
};
