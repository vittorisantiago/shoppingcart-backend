import { Cart } from "../model/Cart";
import { Request, Response } from "express";

const getProductsCart = async (req: Request, res: Response) => {
  
  const productsCart = await Cart.findOne();

  if (!productsCart) 
  {
    res.status(400).json({mensaje: 'No hay productos en el carrito'})
  } 
  else 
  {
    let i
    let total = 0
    let subTotal = 0
    let cant = 0
    const productsCart = await Cart.find()
    for (i=0; i < productsCart.length; i++)
    {
      subTotal = productsCart[i].price
      cant = productsCart[i].amount
      total = total + (cant*subTotal)
    }
    res.status(200).json({productsCart, mensaje: `Precio total: ${total}`})
  }
};

export default getProductsCart;
