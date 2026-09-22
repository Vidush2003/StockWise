const mongoose = require('mongoose');
const { getStockStatus } = require('../utils/stockStatus');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      index: true
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },
    minimumStock: {
      type: Number,
      required: [true, 'Minimum stock threshold is required'],
      min: [0, 'Minimum stock cannot be negative'],
      default: 5
    },
    unit: {
      type: String,
      default: 'pcs',
      trim: true
    },
    supplierName: {
      type: String,
      trim: true,
      default: 'N/A'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual property for computed stock status
productSchema.virtual('status').get(function () {
  return getStockStatus(this.quantity, this.minimumStock);
});

// Text index for fast multi-field search (Name, SKU, Category)
productSchema.index({ name: 'text', sku: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
