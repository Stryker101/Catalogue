import React, { createContext, useState } from "react";

export const InventoryContext = createContext<{
  item: {
    name: string | null;
    stock: string | null;
    price: string | null;
    description: string | null;
    tag: string | null;
  };
  setItem: React.Dispatch<any> | null;
}>({
  item: { name: null, price: null, stock: null, description: null, tag: null },
  setItem: null,
});

const ItemContext: React.FC<{ children: any }> = ({ children }) => {
  const [item, setItem] = useState<{
    name: string | null;
    stock: string | null;
    price: string | null;
    description: string | null;
    tag: string | null;
  }>({ name: null, price: null, stock: null, description: null, tag: null });

  return (
    <InventoryContext.Provider value={{ item, setItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default ItemContext;
