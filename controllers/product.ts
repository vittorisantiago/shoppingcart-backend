import { Product } from "../model/Product";
import { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  
  const products = await Product.find();

  if (products) 
  {
    res.status(200).json({ products });
  } 
  else 
  {
    res.status(400).json({ mensaje: "No hay productos" });
  }
};

export default getProducts;