import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dish: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Done", "In Progress"],
      default: "In Progress",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
