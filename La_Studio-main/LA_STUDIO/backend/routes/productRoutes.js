const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const Product = require('../models/Product');
const cache = require('../middleware/cache');
const logger = require('../logger');

// Search endpoint: optimized
// Query params:
//  q: keyword
//  cat: category
//  minPrice, maxPrice
//  page (1-based), limit
// returns: { total, page, limit, data: [ ... ] }
router.get('/search', cache(30), async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const category = req.query.cat;
    const page = Math.max(1, parseInt(req.query.page || '1'));
    let limit = Math.min(100, parseInt(req.query.limit || '20'));
    if (limit <= 0) limit = 20;
    const offset = (page - 1) * limit;

    // Build WHERE
    const where = [];
    if (category) where.push({ category });
    if (req.query.minPrice) where.push({ price: { [Op.gte]: parseFloat(req.query.minPrice) } });
    if (req.query.maxPrice) where.push({ price: { [Op.lte]: parseFloat(req.query.maxPrice) } });

    // If keyword present prefer FULLTEXT score (if using MySQL)
    let order = [['created_at', 'DESC']];
    let attributes = ['product_id', 'name', 'slug', 'price', 'category', 'stock', 'images'];

    if (q) {
      // Use raw query with MATCH...AGAINST for MySQL fulltext if available
      const safeQ = q.replace(/[^0-9a-zA-Z\s]/g, ' ');
      // Sequelize.literal for score
      attributes.push([Sequelize.literal(`MATCH(name, description) AGAINST(${Sequelize.escape(safeQ)} IN NATURAL LANGUAGE MODE)`), 'score']);
      order = [[Sequelize.literal('score'), 'DESC'], ['created_at', 'DESC']];
      where.push(Sequelize.literal(`MATCH(name, description) AGAINST(${Sequelize.escape(safeQ)} IN NATURAL LANGUAGE MODE)`));
    }

    // Count total (optimized: count only when necessary)
    const { rows, count } = await Product.findAndCountAll({
      where: where.length ? { [Op.and]: where } : undefined,
      attributes,
      limit,
      offset,
      order,
      raw: true
    });

    // Only return required fields (already in attributes)
    res.json({
      total: count,
      page,
      limit,
      data: rows
    });

    logger.info('Search performed', { q, category, page, limit, resultCount: rows.length });
  } catch (err) {
    logger.error('Search error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
