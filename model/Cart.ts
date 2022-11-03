import { model, Schema } from "mongoose";

// Definimos una interfaz para realizar validaciones de estructuras obligatorias dentro el código
interface Cart {
  name: string;
  img: string;
  amount: number;
  price: number;
  provider: string;
  stock: number;
}

// Establecemos las propiedades y tipos del objeto
const CartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  provider: { type: String, required: true },
  stock: { type: Number, required: true },
});

module.exports = model<Cart>("Cart", CartSchema);
