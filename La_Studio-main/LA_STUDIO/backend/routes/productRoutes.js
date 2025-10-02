const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const Product = require('../models/Product');
const cache = require('../middleware/cache');
const logger = require('../logger');

router.get('/search', cache(30), async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const category = req.query.cat;
    const page = Math.max(1, parseInt(req.query.page || '1'));
    let limit = Math.min(100, parseInt(req.query.limit || '20'));
    if (limit <= 0) limit = 20;
    const offset = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (q) {
      // Sử dụng LIKE khi không có fulltext index hoặc khi MySQL chưa hỗ trợ tiếng Việt tốt
      where.name = { [Op.like]: `%${q}%` };
    }

    const products = await Product.findAll({
      where,
      attributes: ['product_id', 'name', 'price', 'category', 'stock', 'images', 'description'],
      limit,
      offset,
      order: [['created_at', 'DESC']],
      raw: true
    });

    res.json({
      total: products.length,
      page,
      limit,
      data: products
    });
  } catch (err) {
    logger.error('Search error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;