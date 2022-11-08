import Cart from "../model/Cart";
import Product from "../model/Product";
import { Request, Response } from "express";

const cartController = 
{
  getProductsCart: async (req: Request, res: Response) => {
  
    const productsCart = await Cart.find();
  
    if (productsCart) 
    {
      let i
      let total = 0
      let subTotal = 0
      let cant = 0
      for (i=0; i < productsCart.length; i++)
      {
        subTotal = productsCart[i].price
        cant = productsCart[i].amount
        total = total + (cant*subTotal)
      }
      res.status(200).json({productsCart, mensaje: `Precio total: ${total}`})
    } 
    else
    {
      res.status(400).json({mensaje: 'No hay productos en el carrito'})
    }
  },
  addProductCart: async (req: Request, res: Response) => {
    try
    {
      const { name } = req.body;
    
      // Nos fijamos si tenemos el producto
      const estaEnProducts = await Product.findOne({ name });
  
      const { stock, img, price, provider } = await Product.findOne({
        stock: estaEnProducts.stock,
        img: estaEnProducts.img,
        price: estaEnProducts.price,
        provider: estaEnProducts.provider,
      });
  
      // Nos fijamos si todos los campos vienen con info
      const noEstaVacio = Boolean(name);
  
      // Nos fijamos si el producto ya está en el carrito
      const estaEnElCarrito = await Cart.findOne({ name });
  
      // Si los campos no están vacios y no esta en el carrito, lo agregamos
      if (noEstaVacio && !estaEnElCarrito) 
      {
        const newProductInCart = new Cart({ name, img, price, amount: 1, provider, stock: stock-1 });
  
        // Y actualizamos la prop inCart: true en nuestros productos
        await Product.findByIdAndUpdate(
          estaEnProducts?._id,
          { inCart: true, name, img, price, provider },
          { new: true }
        )
          .then((product) => {
            newProductInCart.save();
            res.status(200).json({
              mensaje: `El producto fue agregado al carrito`,
              product,
            });
          })
          .catch((error) => console.error(error));
      } 
      // Y si está en el carrito, avisamos
      else if (estaEnElCarrito)
      {
        res.status(400).json({
          mensaje: 'El producto ya esta en el carrito',
        });
      }
      }
      catch (error) 
      {
        res.status(500).json({ mensaje: "Ocurrió un error, el producto no se encontró." });
      }
  },
  putProduct: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const { query } = req.query;
      const body = req.body;
  
      const productInCart = await Cart.findById(productId);
  
      const { name, img, price, _id, provider, stock } = await Product.findOne({
        name: productInCart.name,
      });
      // Si esta el producto en el carrito y quiero aumentar la cantidad
      if (productInCart && query === "add" && body.stock > 0) 
      {
        body.amount = body.amount + 1;
        body.stock = body.stock - 1;
    
        await Cart.findByIdAndUpdate(productId, body, {
          new: true,
        }).then((product) => {
          res.status(200).json({
            mensaje: `El producto: ${product.name} fue actualizado`,
            product,
          });
        });
      } 
      else if (productInCart && query === "add" && body.stock === 0) 
      {
        res.status(400).json({ mensaje: "No hay más stock!" });
      }
      // Si esta el producto en el carrito y quiero disminuir la cantidad
      else if (productInCart && query === "del") {
        body.amount = body.amount - 1;
        body.stock = body.stock + 1;
    
        await Cart.findByIdAndUpdate(productId, body, {
          new: true,
        }).then((product) =>
          res.status(200).json({
            mensaje: `El producto: ${product.name} fue actualizado`,
            product,
          })
        );
      }
      else if(body.amount === 0) 
      {
        await Cart.findByIdAndDelete(productId);
        await Product.findByIdAndUpdate(
          _id,
          { inCart: false, name, img, price, provider },
          { new: true }
        ).then((product) => {
          res.status(200).json({
            mensaje: `El producto ${product.name} fue eliminado del carrito`,
          });
        });
      } 
      else if (body.amount < 0) 
      {
        res.status(400).json({ mensaje: "No se pueden ingresar números negativos." });
      }
      else if (body.amount > stock) 
      {
        res.status(400).json({ mensaje: "No hay suficiente stock!" });
      }
      else
      {
        body.stock = stock - body.amount;
        await Cart.findByIdAndUpdate(
          productId, body, 
          {new: true,}
          ).then((product) =>
          res.status(200).json({
            mensaje: `El producto: ${product.name} fue actualizado`,
            product,
          })
        );      
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Ocurrió un error" });
    }
  },
  deleteProduct: async (req: Request, res: Response) => {
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
          res.status(200).json({
            mensaje: `El producto ${product.name} fue eliminado del carrito`,
          });
        })
        .catch((error) => res.status(400).json({ mensaje: "Hubo un error" }));
    }
    catch (error)
    {
      res.status(500).json({ mensaje: "Ocurrió un error" });
    }
  }
}

export default cartController;