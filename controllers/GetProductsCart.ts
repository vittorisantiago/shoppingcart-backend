import { Cart } from "../model/Cart";

const getProductsCart = async (req: any, res: any) => {
  const productsCart = await Cart.find();

  if (productsCart) {
    res.json({ productsCart });
  } else {
    res.json({ mensaje: "No hay productos en el carrito" });
  }
};

export default getProductsCart;
