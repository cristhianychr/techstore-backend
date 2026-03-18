import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Category } from '../models/Category.model.js';
import { Product } from '../models/Product.model.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log('Connected to MongoDB');

await Category.deleteMany();
await Product.deleteMany();

console.log('Old data removed');

// =====================
// CATEGORIES
// =====================

const categories = await Category.insertMany([
  { name: 'Laptops' },
  { name: 'Smartphones' },
  { name: 'Tablets' },
  { name: 'Accessories' },
  { name: 'Gaming' }
]);

const getCategory = (name) =>
  categories.find((c) => c.name === name)._id;

// =====================
// PRODUCTS
// =====================

const products = [
  // Laptops
  {
    sku: 'LAP-APPLE-M3-14',
    name: 'MacBook Pro 14 M3',
    description: 'Apple laptop with M3 chip',
    brand: 'Apple',
    category: getCategory('Laptops'),
    price: 2499,
    stock: 15
  },
  {
    sku: 'LAP-DELL-XPS13',
    name: 'Dell XPS 13',
    description: 'Ultra portable premium laptop',
    brand: 'Dell',
    category: getCategory('Laptops'),
    price: 1899,
    stock: 20
  },
  {
    sku: 'LAP-ASUS-ROG15',
    name: 'Asus ROG Strix 15',
    description: 'Gaming laptop high performance',
    brand: 'Asus',
    category: getCategory('Laptops'),
    price: 2199,
    stock: 10
  },

  // Smartphones
  {
    sku: 'PHN-APPLE-IP15',
    name: 'iPhone 15 Pro',
    description: 'Latest Apple smartphone',
    brand: 'Apple',
    category: getCategory('Smartphones'),
    price: 1199,
    stock: 30
  },
  {
    sku: 'PHN-SAM-S24',
    name: 'Samsung Galaxy S24',
    description: 'Flagship Samsung smartphone',
    brand: 'Samsung',
    category: getCategory('Smartphones'),
    price: 1099,
    stock: 35
  },

  // Tablets
  {
    sku: 'TAB-APPLE-IPAD',
    name: 'iPad Pro 12.9',
    description: 'High performance Apple tablet',
    brand: 'Apple',
    category: getCategory('Tablets'),
    price: 999,
    stock: 25
  },
  {
    sku: 'TAB-SAM-TAB9',
    name: 'Samsung Galaxy Tab S9',
    description: 'Premium Android tablet',
    brand: 'Samsung',
    category: getCategory('Tablets'),
    price: 899,
    stock: 18
  },

  // Accessories
  {
    sku: 'ACC-LOGI-MX3',
    name: 'Logitech MX Master 3',
    description: 'Wireless productivity mouse',
    brand: 'Logitech',
    category: getCategory('Accessories'),
    price: 99,
    stock: 50
  },
  {
    sku: 'ACC-SONY-WH1000',
    name: 'Sony WH-1000XM5',
    description: 'Noise cancelling headphones',
    brand: 'Sony',
    category: getCategory('Accessories'),
    price: 399,
    stock: 40
  },

  // Gaming
  {
    sku: 'GAM-SONY-PS5',
    name: 'PlayStation 5',
    description: 'Next generation gaming console',
    brand: 'Sony',
    category: getCategory('Gaming'),
    price: 499,
    stock: 12
  },
  {
    sku: 'GAM-LOGI-GPRO',
    name: 'Logitech G Pro Keyboard',
    description: 'Mechanical gaming keyboard',
    brand: 'Logitech',
    category: getCategory('Gaming'),
    price: 149,
    stock: 22
  }
];

// Generar productos adicionales automáticos

for (let i = 1; i <= 40; i++) {
  products.push({
    sku: `GEN-${i}`,
    name: `Generic Tech Product ${i}`,
    description: `General tech product number ${i}`,
    brand: i % 2 === 0 ? 'HP' : 'Lenovo',
    category: categories[i % categories.length]._id,
    price: Math.floor(Math.random() * 2000) + 200,
    stock: Math.floor(Math.random() * 60)
  });
}

await Product.insertMany(products);

console.log('Realistic products created');

process.exit();