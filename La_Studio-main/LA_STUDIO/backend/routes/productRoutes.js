const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const Product = require('../models/Product');
const cache = require('../middleware/cache');
const logger = require('../logger');

router.get('/:id', cache(30), async (req, res) => {
  try {
    const id = req.params.id;
    // Tìm theo PK hoặc theo slug nếu dự định dùng slug
    const product = await Product.findOne({
      where: { product_id: id },
      attributes: ['product_id', 'name', 'price', 'category', 'stock', 'images', 'description', 'attributes', 'slug'],
      raw: true
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // images lưu dưới dạng JSON string trong DB => parse
    let images = [];
    try {
      images = JSON.parse(product.images || '[]');
      if (!Array.isArray(images)) images = [];
    } catch (e) {
      images = [];
    }

    // trả về product + images array
    const out = {
      ...product,
      images, // mảng tên file, ví dụ ['image1.jpg', 'image2.jpg']
    };

    res.json(out);
  } catch (err) {
    logger.error('Get product error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;