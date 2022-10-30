import { Cart } from "../model/Cart";
import { Product } from "../model/Product";
import { Request, Response } from "express";

const putProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { query } = req.query;
    const body = req.body;

    const productInCart = await Cart.findById(productId);

    const { name, img, price, _id, provider } = await Product.findOne({
      name: productInCart.name,
    });
    // Si esta el producto en el carrito y quiero aumentar la cantidad
    if (productInCart && query === "add") {
      body.amount = body.amount + 1;
  
      await Cart.findByIdAndUpdate(productId, body, {
        new: true,
      }).then((product) => {
        res.json({
          mensaje: `El producto: ${product.name} fue actualizado`,
          product,
        });
      });
    // Si esta el producto en el carrito y quiero disminuir la cantidad
    } else if (productInCart && query === "del") {
      body.amount = body.amount - 1;
  
      await Cart.findByIdAndUpdate(productId, body, {
        new: true,
      }).then((product) =>
        res.json({
          mensaje: `El producto: ${product.name} fue actualizado`,
          product,
        })
      );
    }
    else if(body.amount === 0) {
      await Cart.findByIdAndDelete(productId);
      await Product.findByIdAndUpdate(
        _id,
        { inCart: false, name, img, price, provider },
        { new: true }
      ).then((product) => {
        res.json({
          mensaje: `El producto ${product.name} fue eliminado del carrito`,
        });
      });
    } else if (body.amount < 0) {
      res.status(400).json({ mensaje: "Ocurrió un error, no se pueden ingresar números negativos." });
    } else {
      // Buscamos el producto en el carrito para editar algún campo del body
    await Cart.findByIdAndUpdate(productId, body, {new: true,})
    .then((product) => {
      res.json({
        mensaje: `El producto: ${product.name} fue actualizado`,
        product,
      });
    });
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Ocurrió un error" });
  }
};

export default putProduct;
