const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const statsRoutes = require('./routes/statsRoutes');
const prisma = require('./lib/prisma');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);

// Health check & Info
app.get('/api/health', async (req, res) => {
  try {
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    res.json({
      status: 'healthy',
      database: 'MongoDB Atlas Connected',
      productCount,
      orderCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// Root welcome
app.get('/', (req, res) => {
  res.json({
    message: '🌿 Natrulir Organic Microgreens E-Commerce & Admin API is running!',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
      stats: '/api/stats/dashboard',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Natrulir Microgreens Backend Server running on http://localhost:${PORT}`);
});
