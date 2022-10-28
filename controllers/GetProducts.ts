import { Product } from "../model/Product";

const getProducts = async (req: any, res: any) => {
  const products = await Product.find();

  if (products) {
    res.json({ products });
  } else {
    res.json({ mensaje: "No hay productos" });
  }
};

export default getProducts;
