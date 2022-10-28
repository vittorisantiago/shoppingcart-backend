import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  inCart: { type: Boolean, default: false },
  price: { type: Number, required: true },
  provider: { type: String, required: true },
});

export const Product = model("Product", ProductSchema);
