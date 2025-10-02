const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const Product = require('../models/Product');
const cache = require('../middleware/cache');
const logger = require('../logger');

// Search endpoint: optimized
router.get('/search', cache(30), async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const category = req.query.cat;
    const page = Math.max(1, parseInt(req.query.page || '1'));
    let limit = Math.min(100, parseInt(req.query.limit || '20'));
    if (limit <= 0) limit = 20;
    const offset = (page - 1) * limit;

    // Build WHERE + index
    const where = [];
    if (category) where.push({ category });
    if (q) {
      // Sử dụng index fulltext
      const safeQ = q.replace(/[^0-9a-zA-Z\s]/g, ' ');
      where.push(Sequelize.literal(`MATCH(name, description) AGAINST(${Sequelize.escape(safeQ)} IN NATURAL LANGUAGE MODE)`));
    }

    // Chỉ select thuộc tính cần thiết
    let attributes = ['product_id', 'name', 'slug', 'price', 'category', 'stock', 'images'];
    if (q) {
      attributes.push([Sequelize.literal(`MATCH(name, description) AGAINST(${Sequelize.escape(q)} IN NATURAL LANGUAGE MODE)`), 'score']);
    }

    // Truy vấn tối ưu + phân trang
    const { rows, count } = await Product.findAndCountAll({
      where: where.length ? { [Op.and]: where } : undefined,
      attributes,
      limit,
      offset,
      order: [[Sequelize.literal('score'), 'DESC'], ['created_at', 'DESC']],
      raw: true
    });

    // Log thời gian phản hồi
    logger.info('Search performed', { q, category, page, limit, resultCount: rows.length });

    res.json({ total: count, page, limit, data: rows });
  } catch (err) {
    logger.error('Search error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;