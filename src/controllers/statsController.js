const prisma = require('../lib/prisma');

// Get overview stats for Admin Dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const products = await prisma.product.findMany();

    // Calculate revenue
    const totalRevenue = orders
      .filter(o => o.status !== 'Denied')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Group orders by status
    const statusCounts = {
      Pending: 0,
      Processing: 0,
      'Order Picked': 0,
      Denied: 0,
      Delivered: 0
    };

    orders.forEach(order => {
      if (statusCounts[order.status] !== undefined) {
        statusCounts[order.status]++;
      } else {
        statusCounts[order.status] = 1;
      }
    });

    // Calculate stock summary
    const lowStockCount = products.filter(p => p.stock < 15).length;
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

    // Recent 5 orders
    const recentOrders = orders.slice(0, 5);

    res.json({
      success: true,
      data: {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalOrders,
        totalProducts,
        lowStockCount,
        totalStock,
        statusCounts,
        recentOrders
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Server error fetching dashboard stats', error: error.message });
  }
};
