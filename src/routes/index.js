const express = require("express");

// Model
const Order = require("../models/order");

const router = express.Router();

router.get("/orders/list", async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send({
      orders,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/orders/create", async (req, res, next) => {
  try {
    const order = new Order(req.body);

    // field validation order
    await order.validate();

    // validation for order_id
    const isOrderExist = await Order.find({ order_id: order.order_id });

    if (isOrderExist.length) {
      throw new Error("Duplicate order");
    }

    order.save();

    res.status(201).send({
      created_order: order,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/orders/search", async (req, res, next) => {
  try {
    if (!req.body.order_id) {
      throw new Error("Order Id is required");
    }
    const order = await Order.find({ order_id: req.body.order_id });

    if (!order.length) {
      throw new Error("No order found by given id" + req.body.order_id);
    }

    res.status(200).send({
      order,
    });
  } catch (error) {}
});

router.patch("/orders/update", async (req, res, next) => {
  try {
    if (!req.body.order_id) {
      throw new Error("Order Id is required");
    }

    if (!req.body.delivery_date) {
      throw new Error("Delivery date is required");
    }

    const order = await Order.find({ order_id: req.body.order_id });

    if (!order.length) {
      throw new Error("No order found by given id" + req.body.order_id);
    }

    order[0].delivery_date = req.body.delivery_date;

    order[0].save();

    res.status(200).send({
      updated_order: order,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/orders/delete", async (req, res, next) => {
  try {
    if (!req.body.order_id) {
      throw new Error("Order Id is required");
    }

    const order = await Order.deleteOne({ order_id: req.body.order_id });

    res.status(200).send({
      order:
        order.deletedCount === 1
          ? "Order deleted successfully"
          : "Order doesn't exist in DB to delete",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
