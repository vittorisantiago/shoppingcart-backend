import { Cart } from "../model/Cart";
import { Product } from "../model/Product";
import { Request, Response } from "express";

const deleteProduct = async (req: Request, res: Response) => {
  try 
  {
    const { productId } = req.params;

    // Buscamos el producto en el carrito por id
    const productInCart = await Cart.findById(productId);

    // Buscamos un producto en nuestra DB y guardamos el nombre de este
    const { name, img, price, _id, provider } = await Product.findOne({
      name: productInCart.name,
    });

    // Buscamos y eliminamos el producto con la id
    await Cart.findByIdAndDelete(productId);
    
    // Buscamos y editamos la prop inCart: false
    // Le pasamos la id del producto en la DB y las prop a cambiar
    // El new para devolver el producto editado
    await Product.findByIdAndUpdate(
      _id,
      { inCart: false, name, img, price, provider },
      { new: true }
    )
      .then((product) => {
        res.json({
          mensaje: `El producto ${product.name} fue eliminado del carrito`,
        });
      })
      .catch((error) => res.json({ mensaje: "Hubo un error" }));
  }
  catch (error)
  {
    res.status(400).json({ mensaje: "Ocurrió un error" });
  }
};

export default deleteProduct;
