const Order = require("../models/orderModel");

const orderController = {
  async createOrder(req, res) {
    console.log(req.body);
    try {
      const { displayName, email, country, city, phone, productId } = req.body;

      if (!displayName || !email) {
        return res
          .status(400)
          .json({ message: "You must enter name & email." });
      }

      if (!phone) {
        return res
          .status(400)
          .json({ message: "You must enter a phone number." });
      }
      if (!country || !city) {
        return res
          .status(400)
          .json({ message: "You must enter a country and city." });
      }
      if (!productId) {
        return res.status(400).json({ message: "You must enter product id." });
      }

      const newOrder = new Order({
        displayName,
        email,

        country,
        city,
        phone,
        productId,
      });

      await newOrder.save();

      res.json({
        message: "Your Order Successfully done.",
      });
    } catch (err) {
      return res.status(500).json({ message: "Server Error." });
    }
  },
  async getAllOrders(req, res) {
    let orders;
    try {
      orders = await Order.find().select("-updatedAt -__v").sort({ _id: -1 });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }

    res.json(orders);
  },

  // get the specific user order
  async getOrderByEmail(req, res) {
    let orders;

    try {
      // const email = req.params;
      orders = await Order.find({ email: req.params.email });
      // orders = await Order.find({ _id: id }).select("-updatedAt -__v");
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }

    res.json(orders);
  },

  async deleteOrder(req, res, next) {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: "Order Deleted Successfully." });
    } catch (err) {
      return res.status(500).json({ message: "Server Eorror." });
    }
  },
};

module.exports = orderController;
