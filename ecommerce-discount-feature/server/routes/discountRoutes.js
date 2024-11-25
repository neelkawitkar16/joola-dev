const express = require('express');
const Discount = require('../models/discount');

const router = express.Router();

router.post('/validate', async (req, res) => {
  const { discountCode, cartTotal } = req.body;

  try {
    const discount = await Discount.findOne({ code: discountCode });
    if (!discount || discount.expiryDate < new Date() || (discount.usageLimit && discount.usageCount >= discount.usageLimit)) {
      return res.status(400).json({ message: 'Invalid discount code.' });
    }

    let discountedTotal = cartTotal;
    if (discount.type === 'percentage') {
      discountedTotal -= (discount.value / 100) * cartTotal;
    } else if (discount.type === 'fixed') {
      discountedTotal -= discount.value;
    }
    discountedTotal = Math.max(discountedTotal, 0); // check total is not negative.

    discount.usageCount += 1;
    await discount.save();

    res.status(200).json({ discountedTotal });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;