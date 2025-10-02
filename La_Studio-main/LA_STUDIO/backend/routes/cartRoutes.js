const express = require('express');
const router = express.Router();
const redis = require('../utils/redisClient');
const logger = require('../logger');

// Add to cart API
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) return res.status(400).json({ error: "Missing fields" });

  const cartKey = `cart:${userId}`;
  let cart = JSON.parse(await redis.get(cartKey)) || [];
  const index = cart.findIndex(item => item.productId === productId);
  if (index >= 0) cart[index].quantity += quantity;
  else cart.push({ productId, quantity });

  await redis.set(cartKey, JSON.stringify(cart), 'EX', 3600); // TTL 1h
  logger.info('Cart updated', { userId, cart });
  res.json({ cart });
});

module.exports = router;