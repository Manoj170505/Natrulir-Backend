const prisma = require('../lib/prisma');

// Get all products with optional filters
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, badge, featured, sort } = req.query;
    
    let where = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (badge && badge !== 'All') {
      where.badge = badge;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search && search.trim() !== '') {
      where.OR = [
        { name: { contains: search.trim(), mode: 'insensitive' } },
        { tagline: { contains: search.trim(), mode: 'insensitive' } },
        { description: { contains: search.trim(), mode: 'insensitive' } },
        { category: { contains: search.trim(), mode: 'insensitive' } }
      ];
    }

    let orderBy = { createdAt: 'desc' };
    if (sort === 'price-asc') orderBy = { price: 'asc' };
    else if (sort === 'price-desc') orderBy = { price: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };
    else if (sort === 'name') orderBy = { name: 'asc' };

    const products = await prisma.product.findMany({
      where,
      orderBy
    });

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error fetching products', error: error.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Server error fetching product', error: error.message });
  }
};

// Create product (Admin)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      tagline,
      description,
      price,
      originalPrice,
      category,
      image,
      badge,
      stock,
      harvestTime,
      nutrition,
      tasteProfile,
      weight,
      featured,
      colors
    } = req.body;

    if (!name || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, category, and image are required fields'
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        tagline: tagline || '',
        description: description || '',
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        category,
        image,
        badge: badge || null,
        rating: 4.9,
        reviewsCount: Math.floor(Math.random() * 50) + 10,
        stock: stock !== undefined ? parseInt(stock, 10) : 50,
        harvestTime: harvestTime || 'Harvested Daily',
        nutrition: Array.isArray(nutrition) ? nutrition : (nutrition ? nutrition.split(',').map(s => s.trim()) : []),
        tasteProfile: tasteProfile || 'Fresh & Crisp',
        weight: weight || 'Fresh Harvest',
        featured: Boolean(featured),
        colors: Array.isArray(colors) ? colors : (colors ? colors.split(',').map(s => s.trim()) : ['#366D44', '#8FB339', '#EFEAD8'])
      }
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Server error creating product', error: error.message });
  }
};

// Update product (Admin)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Convert numeric fields if present
    if (data.price !== undefined) data.price = parseFloat(data.price);
    if (data.originalPrice !== undefined) data.originalPrice = data.originalPrice ? parseFloat(data.originalPrice) : null;
    if (data.stock !== undefined) data.stock = parseInt(data.stock, 10);
    if (data.featured !== undefined) data.featured = Boolean(data.featured);
    if (typeof data.nutrition === 'string') {
      data.nutrition = data.nutrition.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (typeof data.colors === 'string') {
      data.colors = data.colors.split(',').map(s => s.trim()).filter(Boolean);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data
    });

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Server error updating product', error: error.message });
  }
};

// Delete product (Admin)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Server error deleting product', error: error.message });
  }
};
