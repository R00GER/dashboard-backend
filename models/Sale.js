import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
  rowId: { type: Number },
  orderId: { type: String },
  orderDate: { type: String },
  shipDate: { type: String },
  shipMode: { type: String },
  customerId: { type: String },
  customerName: { type: String },
  segment: { type: String },
  country: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: Number },
  region: { type: String },
  productId: { type: String },
  category: { type: String },
  subCategory: { type: String },
  productName: { type: String },
  sales: { type: String },
  quantity: { type: Number },
  discount: { type: String },
  profit: { type: String },
});

export default mongoose.model("sales", saleSchema);
