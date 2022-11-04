import { model, Schema } from "mongoose";

// Definimos una interfaz para realizar validaciones de estructuras obligatorias dentro el código
interface Product {
  name: string;
  img: string;
  inCart: boolean;
  price: number;
  provider: string;
  stock: number;
}

// Establecemos las propiedades y tipos del objeto
const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  inCart: { type: Boolean, default: false },
  price: { type: Number, required: true },
  provider: { type: String, required: true },
  stock: { type: Number, required: true },
});

export default model<Product>("Product", ProductSchema);
