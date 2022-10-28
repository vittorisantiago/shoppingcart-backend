import { model, Schema } from "mongoose";

const CartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  provider: { type: String, required: true },
});

export const Cart = model("Cart", CartSchema);
