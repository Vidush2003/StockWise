const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const Product = require('../models/Product');
const InventoryTransaction = require('../models/InventoryTransaction');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

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
      // Electronics
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
        minimumStock: 5, // LOW STOCK
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
        quantity: 0, // OUT OF STOCK
        minimumStock: 3,
        unit: 'pcs',
        supplierName: 'Sony Digital Logistics',
        createdBy: adminUser._id
      },
      {
        name: 'TP-Link Archer AX55 Wi-Fi 6 Router',
        sku: 'NET-TPL-AX55',
        category: 'Networking',
        description: 'Dual-band Gigabit Wi-Fi 6 router up to 3000 Mbps',
        price: 5999,
        quantity: 12,
        minimumStock: 4,
        unit: 'pcs',
        supplierName: 'Global Net Hardware',
        createdBy: adminUser._id
      },
      // Accessories
      {
        name: 'Logitech MX Master 3S Wireless Mouse',
        sku: 'MOU-LOG-MX3S',
        category: 'Accessories',
        description: 'Performance wireless ergonomic mouse with 8K DPI tracking',
        price: 8995,
        quantity: 25,
        minimumStock: 8,
        unit: 'pcs',
        supplierName: 'Logitech Official Store',
        createdBy: adminUser._id
      },
      {
        name: 'Keychron K2 Wireless Mechanical Keyboard',
        sku: 'KEY-KEY-K2V2',
        category: 'Accessories',
        description: 'Compact 75% layout mechanical keyboard with Gateron Brown switches',
        price: 7499,
        quantity: 3,
        minimumStock: 5, // LOW STOCK
        unit: 'pcs',
        supplierName: 'Keychron Direct',
        createdBy: adminUser._id
      },
      {
        name: 'Anker USB-C to USB-C Braided Cable 6ft',
        sku: 'CAB-ANK-CC6F',
        category: 'Accessories',
        description: '100W PD fast charging durable nylon braided cable',
        price: 999,
        quantity: 50,
        minimumStock: 15,
        unit: 'pcs',
        supplierName: 'Anker Innovations',
        createdBy: adminUser._id
      },
      {
        name: 'SanDisk 128GB Ultra Dual USB Drive',
        sku: 'STR-SAN-128G',
        category: 'Accessories',
        description: 'High speed USB 3.1 flash drive with Type-C and Type-A connectors',
        price: 1299,
        quantity: 0, // OUT OF STOCK
        minimumStock: 10,
        unit: 'pcs',
        supplierName: 'SanDisk Supplies',
        createdBy: adminUser._id
      },
      {
        name: 'Aluminum Ergonomic Laptop Stand',
        sku: 'ACC-LAP-STND',
        category: 'Accessories',
        description: 'Adjustable ventilated laptop riser for 10-17 inch notebooks',
        price: 1899,
        quantity: 14,
        minimumStock: 5,
        unit: 'pcs',
        supplierName: 'ErgoTech Accessories',
        createdBy: adminUser._id
      },
      // Office Furniture
      {
        name: 'Ergonomic Mesh Office Chair',
        sku: 'FUR-CHR-MSH01',
        category: 'Furniture',
        description: 'High-back mesh chair with adjustable lumbar support and armrests',
        price: 14999,
        quantity: 8,
        minimumStock: 3,
        unit: 'pcs',
        supplierName: 'Featherlite Furniture',
        createdBy: adminUser._id
      },
      {
        name: 'Electric Height Adjustable Standing Desk',
        sku: 'FUR-DSK-STND02',
        category: 'Furniture',
        description: 'Dual motor motorized sit-stand desk frame with wooden top',
        price: 27999,
        quantity: 2,
        minimumStock: 3, // LOW STOCK
        unit: 'pcs',
        supplierName: 'ErgoWorkspace Ltd',
        createdBy: adminUser._id
      },
      {
        name: 'LED Architect Desk Lamp with Clamp',
        sku: 'FUR-LMP-LED01',
        category: 'Furniture',
        description: 'Dimmable eye-caring desk lamp with memory function and USB port',
        price: 2499,
        quantity: 11,
        minimumStock: 4,
        unit: 'pcs',
        supplierName: 'Lumina Tech',
        createdBy: adminUser._id
      },
      // Stationery & Office Supplies
      {
        name: 'Moleskine Classic Hardcover Notebook',
        sku: 'STN-MOL-NTBK',
        category: 'Stationery',
        description: 'Ruled large notebook 240 pages acid-free paper',
        price: 1495,
        quantity: 35,
        minimumStock: 10,
        unit: 'pcs',
        supplierName: 'Moleskine Distributors',
        createdBy: adminUser._id
      },
      {
        name: 'Pilot G2 Premium Gel Pens (Pack of 12)',
        sku: 'STN-PIL-G2P12',
        category: 'Stationery',
        description: '0.7mm fine point black gel ink pens',
        price: 899,
        quantity: 40,
        minimumStock: 10,
        unit: 'boxes',
        supplierName: 'Pilot Pen Corp',
        createdBy: adminUser._id
      },
      {
        name: 'A4 Multipurpose Printer Paper 75GSM',
        sku: 'OFF-PAP-A475',
        category: 'Office Supplies',
        description: '500 sheets ream premium white laser and inkjet paper',
        price: 349,
        quantity: 85,
        minimumStock: 20,
        unit: 'reams',
        supplierName: 'JK Paper Ltd',
        createdBy: adminUser._id
      },
      {
        name: 'Heavy Duty 2-Hole Puncher',
        sku: 'OFF-PNC-2HLE',
        category: 'Office Supplies',
        description: 'Metal puncher with guide bar up to 30 sheets capacity',
        price: 599,
        quantity: 1,
        minimumStock: 4, // LOW STOCK
        unit: 'pcs',
        supplierName: 'Kangaroo Officeware',
        createdBy: adminUser._id
      },
      // Networking
      {
        name: 'Cat6 Ethernet Patch Cable 10m',
        sku: 'NET-CAB-C610M',
        category: 'Networking',
        description: 'Snagless RJ45 Gigabit Ethernet network cable',
        price: 499,
        quantity: 60,
        minimumStock: 15,
        unit: 'pcs',
        supplierName: 'D-Link Cables',
        createdBy: adminUser._id
      },
      {
        name: 'Cisco 8-Port Gigabit Unmanaged Switch',
        sku: 'NET-CSC-SW08',
        category: 'Networking',
        description: 'Plug-and-play desktop metal housing network switch',
        price: 3899,
        quantity: 9,
        minimumStock: 3,
        unit: 'pcs',
        supplierName: 'Cisco Networking Inc',
        createdBy: adminUser._id
      }
    ];

    const createdProducts = await Product.insertMany(productsData);

    console.log('[Seeder] Generating sample audit transaction history...');
    const now = new Date();
    const sampleTransactions = [
      {
        product: createdProducts[0]._id, // Dell Monitor
        type: 'STOCK_IN',
        quantity: 20,
        previousQuantity: 0,
        newQuantity: 20,
        reason: 'Initial purchase order shipment',
        performedBy: adminUser._id,
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        product: createdProducts[0]._id, // Dell Monitor
        type: 'STOCK_OUT',
        quantity: 2,
        previousQuantity: 20,
        newQuantity: 18,
        reason: 'Issued to engineering team',
        performedBy: staffUser1._id,
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        product: createdProducts[4]._id, // MX Master 3S
        type: 'STOCK_IN',
        quantity: 30,
        previousQuantity: 0,
        newQuantity: 30,
        reason: 'Quarterly inventory restock',
        performedBy: adminUser._id,
        createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        product: createdProducts[4]._id, // MX Master 3S
        type: 'STOCK_OUT',
        quantity: 5,
        previousQuantity: 30,
        newQuantity: 25,
        reason: 'Sales order dispatch',
        performedBy: staffUser2._id,
        createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        product: createdProducts[1]._id, // Webcam
        type: 'STOCK_OUT',
        quantity: 6,
        previousQuantity: 10,
        newQuantity: 4,
        reason: 'Remote workstation setups',
        performedBy: staffUser1._id,
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
      }
    ];

    await InventoryTransaction.insertMany(sampleTransactions);

    console.log('----------------------------------------------------');
    console.log('✅ [Seeder] StockWise Database Populated Successfully!');
    console.log('----------------------------------------------------');
    console.log('Demo Credentials:');
    console.log('  Admin User : admin@stockwise.com / password123');
    console.log('  Staff User : staff@stockwise.com / password123');
    console.log('  Staff User : john@stockwise.com  / password123');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error(`❌ [Seeder Error] ${error.message}`);
    process.exit(1);
  }
};

seedData();
