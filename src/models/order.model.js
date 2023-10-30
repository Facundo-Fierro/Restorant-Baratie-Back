import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Dishes: { type: [Object],required: true, },
    details: {
      type: String,
      default: "",
    },
    ubication: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Efectivo", "Tarjeta"],
     
    },
    Total:{type:Number,required:true},
    status: {
      type: String,
      enum: ["Entregado", "En Progreso..."],
      default: "En Progreso...",
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
