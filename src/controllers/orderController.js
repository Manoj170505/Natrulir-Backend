const prisma = require('../lib/prisma');

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    let where = {};

    if (status && status !== 'All') {
      where.status = status;
    }

    if (search && search.trim() !== '') {
      where.OR = [
        { orderNumber: { contains: search.trim(), mode: 'insensitive' } },
        { customerName: { contains: search.trim(), mode: 'insensitive' } },
        { customerEmail: { contains: search.trim(), mode: 'insensitive' } },
        { customerPhone: { contains: search.trim(), mode: 'insensitive' } },
        { city: { contains: search.trim(), mode: 'insensitive' } }
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Server error fetching orders', error: error.message });
  }
};

// Get single order by ID or orderNumber
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let order = null;

    if (id.startsWith('MG-')) {
      order = await prisma.order.findUnique({
        where: { orderNumber: id }
      });
    } else {
      order = await prisma.order.findUnique({
        where: { id }
      });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, message: 'Server error fetching order', error: error.message });
  }
};

// Create new customer order (Checkout)
exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      state,
      postalCode,
      notes,
      items,
      paymentMethod,
      shippingFee = 0,
      discount = 0
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Customer information, delivery address, and cart items are required'
      });
    }

    // Calculate subtotal and total amount
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = Math.max(0, subtotal + parseFloat(shippingFee) - parseFloat(discount));

    // Generate readable random order number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `MG-${new Date().getFullYear()}-${randomSuffix}`;

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city: city || 'Local City',
        state: state || '',
        postalCode: postalCode || '',
        notes: notes || '',
        status: 'Pending',
        paymentMethod: paymentMethod || 'Cash on Delivery',
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        subtotal: parseFloat(subtotal.toFixed(2)),
        shippingFee: parseFloat(shippingFee),
        discount: parseFloat(discount),
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        items: items.map(item => ({
          productId: item.id || item.productId || 'custom',
          productName: item.name || item.productName,
          productImage: item.image || item.productImage || '',
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity, 10),
          category: item.category || ''
        }))
      }
    });

    // Optionally decrement product stock
    for (const item of items) {
      if (item.id && item.id.length === 24) {
        try {
          await prisma.product.update({
            where: { id: item.id },
            data: { stock: { decrement: parseInt(item.quantity, 10) } }
          });
        } catch (stockErr) {
          console.log(`Stock update skipped for ${item.id}`);
        }
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: newOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Server error creating order', error: error.message });
  }
};

// Update order status (Admin: "Order Picked", "Denied", "Processing", "Delivered", "Pending")
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const allowedStatuses = ['Pending', 'Processing', 'Order Picked', 'Denied', 'Delivered'];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed statuses: ${allowedStatuses.join(', ')}`
      });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      message: `Order status updated to "${status}"`,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Server error updating order', error: error.message });
  }
};

// Delete order (Admin)
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ success: false, message: 'Server error deleting order', error: error.message });
  }
};
