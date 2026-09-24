const User = require('../models/User');
const Product = require('../models/Product');
const InventoryTransaction = require('../models/InventoryTransaction');

const seedRemoteDB = async (req, res) => {
  try {
    console.log('[Seeder] Cleaning existing database records...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await InventoryTransaction.deleteMany({});

    console.log('[Seeder] Creating users...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@stockwise.com',
      password: 'password123',
      role: 'admin'
    });

    const staffUser1 = await User.create({
      name: 'Sarah Jenkins',
      email: 'staff@stockwise.com',
      password: 'password123',
      role: 'staff'
    });

    const staffUser2 = await User.create({
      name: 'John Doe',
      email: 'john@stockwise.com',
      password: 'password123',
      role: 'staff'
    });

    console.log('[Seeder] Creating demo products...');
    const productsData = [
      {
        name: 'Dell UltraSharp 27" 4K Monitor',
        sku: 'MON-DELL-4K27',
        category: 'Electronics',
        description: 'IPS 4K monitor with USB-C hub and height adjustment',
        price: 34999,
        quantity: 18,
        minimumStock: 5,
        unit: 'pcs',
        supplierName: 'Dell Enterprise Supplies',
        createdBy: adminUser._id
      },
      {
        name: 'Logitech C920 HD Pro Webcam',
        sku: 'CAM-LOG-C920',
        category: 'Electronics',
        description: 'Full HD 1080p video calling with stereo microphone',
        price: 6490,
        quantity: 4,
        minimumStock: 5,
        unit: 'pcs',
        supplierName: 'Logitech Official Store',
        createdBy: adminUser._id
      },
      {
        name: 'Sony WH-1000XM5 Wireless Headphones',
        sku: 'AUD-SONY-XM5',
        category: 'Electronics',
        description: 'Industry leading noise canceling headphones',
        price: 29990,
        quantity: 0,
        minimumStock: 3,
        unit: 'pcs',
        supplierName: 'Sony Digital Logistics',
        createdBy: adminUser._id
      }
    ];

    const createdProducts = await Product.insertMany(productsData);

    console.log('[Seeder] Generating sample audit transaction history...');
    const now = new Date();
    const sampleTransactions = [
      {
        product: createdProducts[0]._id, 
        type: 'STOCK_IN',
        quantity: 20,
        previousQuantity: 0,
        newQuantity: 20,
        reason: 'Initial purchase order shipment',
        performedBy: adminUser._id,
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)
      }
    ];

    await InventoryTransaction.insertMany(sampleTransactions);

    res.status(200).json({
      success: true,
      message: 'Database seeded successfully from the cloud!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { seedRemoteDB };
