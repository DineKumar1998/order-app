const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    item_name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    order_date: {
      type: Date,
      required: true,
    },
    delivery_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.id;
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
