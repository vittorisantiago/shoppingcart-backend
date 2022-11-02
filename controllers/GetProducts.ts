import { Product } from "../model/Product";
import { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  
  const products = await Product.find();

  if (products) 
  {
    res.json({ products });
  } 
  else 
  {
    res.json({ mensaje: "No hay productos" });
  }
};

export default getProducts;
