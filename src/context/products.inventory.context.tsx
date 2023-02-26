import React from "react";
import { getProducts, storeProducts } from "../utils/helpers.utils";

export interface IProduct {
  id: string;
  name: string;
  stock: number;
  price: number;
  description: string;
  tag: string;
}
export type ProductContextType = {
  products: IProduct[];
  saveProduct: (product: IProduct, callback?: () => void) => void;
  updateProduct: (update: IProduct, callback?: () => void) => void;
  deleteProduct: (id: string, callback?: () => void) => void;
};

export const ProductContext = React.createContext<ProductContextType | null>(
  null
);

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  const saveProduct = (product: IProduct, callback?: () => void) => {
    const newProduct: IProduct = {
      id: product.id, // not really unique - but fine for this example
      name: product.name,
      stock: product.stock,
      price: product.price,
      description: product.description,
      tag: product.tag,
    };
    setProducts([...products, newProduct]);
    callback && callback();
  };

  const updateProduct = (update: IProduct, callback?: () => void) => {
    products.filter((product: IProduct) => {
      if (product.id === update.id) {
        product.name = update.name;
        product.stock = update.stock;
        product.price = update.price;
        product.description = update.description;
        product.tag = update.tag;

        setProducts([...products]);
        storeProducts(JSON.stringify(products));
      }
    });
    callback && callback();
  };

  const deleteProduct = (id: string, callback?: () => void) => {
    const filteredProducts = products.filter(
      (product: IProduct) => product.id !== id
    );
    setProducts([...filteredProducts]);
    storeProducts(JSON.stringify(filteredProducts));
    callback && callback();
  };

  React.useEffect(() => {
    getProducts((value) => {
      if (typeof value === "string") {
        setProducts([...JSON.parse(value)]);
      }
    });
  }, []);

  React.useEffect(() => {
    storeProducts(JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider
      value={{ products, saveProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
