const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true },
  expiryDate: { type: Date },
  usageLimit: { type: Number },
  usageCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Discount', discountSchema);
